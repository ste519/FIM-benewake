import React, { useContext } from 'react';
import { TabContext } from '../routes/test';

export default function TabLabels() {
    const { tabLabels, setTabLabels } = useContext(TabContext)
    const { activeTab, setActiveTab } = useContext(TabContext)

    const removeTab = (removedLabel) => {
        setTabLabels(tabLabels.filter((label) => { return label !== removedLabel }));
        setActiveTab(null);
        console.log("Removed " + removedLabel);
    }

    return (
        <div className="tab-labels">
            {tabLabels.map((label) => (
                <div
                    key={label}
                    onClick={() => setActiveTab(label)}
                    className={`tab ${activeTab === label ? 'active' : ""}`}
                >
                    {label}
                    <button
                        className="close-btn"
                        onClick={() => { removeTab(label) }}>
                    </button>
                </div>
            ))}
        </div>
    );
};


