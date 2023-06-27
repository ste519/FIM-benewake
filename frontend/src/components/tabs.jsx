import React, { useState } from 'react';

const Tab = ({ label, activeTab, onClick }) => (
    <div
        onClick={onClick}
        className={`tab ${activeTab === label ? 'active' : ""}`}
    >
        {label}
    </div>
);

const TabContent = ({ content, activeTab, label }) => (
    activeTab === label ?
        <div className="tab-content">{content}</div> : null
);

const TabContainer = ({ tabsData }) => {
    const [activeTab, setActiveTab] = useState(tabsData[0].label);

    return (
        <div className="container">
            <div className="tab-container">
                {tabsData.map((tab) => (
                    <Tab
                        key={tab.label}
                        label={tab.label}
                        activeTab={activeTab}
                        onClick={() => setActiveTab(tab.label)}
                    />
                ))}
            </div>
                {tabsData.map((tab) => (
                    <TabContent
                        key={tab.label}
                        activeTab={activeTab}
                        label={tab.label}
                        content={tab.content}
                    />
                ))}
        </div>
    );
};

export default function Tabs() {
    const tabsData = [
        { label: "Tab 1", content: "Content for Tab 1" },
        { label: "Tab 2", content: "Content for Tab 2" },
        { label: "Tab 3", content: "Content for Tab 3" },
    ];

    return <TabContainer tabsData={tabsData} />;
};


