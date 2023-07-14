import { useState, useEffect } from 'react';
import useTabContext from '../hooks/useTabContext';


const SecTabs = ({ labels }) => {
    const [activeSecTab, setActiveSecTab] = useState();
    const { currentPreset, currentView, setCurrentView } = useTabContext()
    useEffect(() => { setActiveSecTab(currentPreset?.defaultSecTab) }, [currentPreset])
    const handleSecTabClick = (label) => {
        setActiveSecTab(label);
        setCurrentView({ ...currentView, selectedSecTab: label })
    }

    return (
        <div className="sec-tab-wrapper row">
            {labels.map((label, i) =>
                <div key={i}
                    className={`secondary-tab ${activeSecTab === label ? "active" : ""}`}
                    onClick={() => handleSecTabClick(label)}>
                    {label}
                </div>
            )}
        </div>
    )
}


export default SecTabs;
