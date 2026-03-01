import FontJerk from "./features/font-jerk";
import {useState} from "react";
import BitmapFontToBinary from "./features/bitmap-to-binary";
import './App.css';
import None from "./features/none";

const Features = {
    None: None,
    BitmapToBinary: BitmapFontToBinary,
    TheFontJerk: FontJerk
}

const App = () => {

    const [activeFeature, setActiveFeature] = useState<keyof typeof Features>("None");

    const FeatureComponent = Features[activeFeature];

    return (
        <div>
            <nav className="app-nav">
                {(Object.keys(Features) as Array<keyof typeof Features>).map((featureName) => (
                    <button
                        key={featureName}
                        onClick={() => setActiveFeature(featureName)}
                        className={activeFeature === featureName ? 'active' : ''}
                    >
                        {featureName}
                    </button>
                ))}
            </nav>
            <div className="app-content">
                <FeatureComponent/>
            </div>
        </div>
    );
}

export default App;