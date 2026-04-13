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
}

function BinaryOutput(props: BinaryProps) {
    const {character} = props

    let counter = 0;

    return (
        <div className="pixel-states">
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

    const handlePixelClick = ({row, col, newState}: HandlePixelClick) => {
        const _chars = [...character];
        _chars[row][col] = newState;
        setCharacter(_chars);
    }

    const loadCharacter = (char: string) => {
        const pattern = PREDEFINED_CHARS[char];
        if (pattern) {
            setCharacter(pattern.map(row => [...row]));
        }
    }

    return (
        <div className="app-container">
            <div className="app">
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
                <BinaryOutput character={character}/>
            </div>
            <div className="character-bar">
                {Object.keys(PREDEFINED_CHARS).map((char) => (
                    <button
                        key={char}
                        onClick={() => loadCharacter(char)}
                        className="character-button"
                    >
                        {char}
                        <span className="corner-bl"></span>
                        <span className="corner-br"></span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default BitmapFontToBinary
