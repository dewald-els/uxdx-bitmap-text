import {useState} from 'react'
import './bitmap-to-binary.css'

type Pixel = 0 | 1;

const FIVE_SEVEN_GRID: Pixel[][] = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
];

const PREDEFINED_CHARS: Record<string, Pixel[][]> = {
    'A': [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0],
    ],
    'B': [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0],
    ],
    'C': [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0],
    ],
    'E': [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
    ],
    'H': [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0],
    ],
    'Y': [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
    ],
    '1': [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
    ],
    '3': [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0],
    ],
    '{': [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0],
    ],
    '(': [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
    ],
};


interface PixelProps {
    state: Pixel;
    onClick: (newState: Pixel) => void;
}

function Pixel(props: PixelProps) {
    const {state, onClick} = props;

    const handleClick = () => {
        onClick(state === 0 ? 1 : 0);
    }

    return (
        <button onClick={handleClick} className={`pixel ${state === 1 ? "pixel__on" : "pixel__off"}`}>
        </button>
    )
}

interface BinaryProps {
    character: Pixel[][];
    selectedChar?: string;
}

function ASCIIOutput(props: BinaryProps) {
    const {selectedChar} = props;
    
    if (!selectedChar) {
        return (
            <div className="ascii-output">
                <div className="ascii-title">ASCII</div>
                <div className="ascii-value">CHAR: -</div>
                <div className="ascii-value">DEC: -</div>
                <div className="ascii-value">HEX: -</div>
            </div>
        );
    }
    
    const asciiValue = selectedChar.charCodeAt(0);
    
    return (
        <div className="ascii-output">
            <div className="ascii-title">ASCII</div>
            <div className="ascii-value">CHAR: {selectedChar}</div>
            <div className="ascii-value">DEC: {asciiValue}</div>
            <div className="ascii-value">HEX: 0x{asciiValue.toString(16).toUpperCase().padStart(2, '0')}</div>
        </div>
    );
}

function BinaryOutput(props: BinaryProps) {
    const {character} = props

    let counter = 0;

    return (
        <div className="pixel-states">
            <div className="binary-title">BINARY</div>
            {character.map((rows, rowIdx) => rows.map((pixel, idx) => {
                counter++;
                const shouldBreak = counter % 5 === 0;
                return (
                    <span key={`${rowIdx}-${idx}-${pixel}`}>
                       <span
                           className={`pixel-binary-state ${pixel === 1 ? 'pixel-binary-state--bold' : ''}`}>{pixel}</span>
                        {shouldBreak && <br/>}
                   </span>
                )
            }))}
        </div>
    )

}

interface HandlePixelClick {
    row: number;
    col: number;
    newState: Pixel;
}


function BitmapFontToBinary() {

    const [character, setCharacter] = useState<Pixel[][]>(FIVE_SEVEN_GRID);
    const [selectedChar, setSelectedChar] = useState<string | undefined>(undefined);

    const handlePixelClick = ({row, col, newState}: HandlePixelClick) => {
        const _chars = [...character];
        _chars[row][col] = newState;
        setCharacter(_chars);
    }

    const loadCharacter = (char: string) => {
        const pattern = PREDEFINED_CHARS[char];
        if (pattern) {
            setCharacter(pattern.map(row => [...row]));
            setSelectedChar(char);
        }
    }

    return (
        <div className="app-container">
            <div className="app">
                <ASCIIOutput character={character} selectedChar={selectedChar}/>
                <BinaryOutput character={character}/>
                <div
                    className={character[0].length === 5 ? "pixel-5-7-grid" : character[0].length === 8 ? "pixel-8-8-grid" : character[0].length === 10 ? "pixel-10-10-grid" : "pixel-16-16-grid"}>
                    {character.map((row, rowIdx) => row.map((pixel, colIdx) => <Pixel
                        key={`${rowIdx}-${colIdx}-${pixel}`} state={pixel} onClick={(newState) => {
                        handlePixelClick({
                            row: rowIdx,
                            col: colIdx,
                            newState,
                        })
                    }}/>))}
                </div>
            </div>
            <div className="character-bar">
                {Object.keys(PREDEFINED_CHARS).map((char) => (
                    <button
                        key={char}
                        onClick={() => loadCharacter(char)}
                        className={`character-button ${selectedChar === char ? 'character-button--active' : ''}`}
                    >
                        {char}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default BitmapFontToBinary
