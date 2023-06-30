import React, { useContext, useEffect } from 'react';
import { TabContext } from '../routes/test';

export default function TabLabels() {
    const { tabLabels, setTabLabels, activeTab, setActiveTab } = useContext(TabContext)
    const removeTab = (removedLabel, e) => {
        setActiveTab(null);
        setTabLabels(tabLabels.filter((label) => { return label !== removedLabel }));
        e.stopPropagation()
        console.log("Removed " + removedLabel);
    }

    return (
        <div className="tab-labels">
            {tabLabels.map((label) => (
                <div
                    key={label}
                    onClick={(e) => {setActiveTab(label)}}
                    className={`tab ${activeTab === label ? 'active' : ""}`}
                >
                    {label}
                    <button
                        className="close-btn"
                        onClick={(e) => removeTab(label, e)}>
                    </button>
                </div>
            ))}
        </div>
    );
};


