import React, { useState, useLayoutEffect, useContext } from 'react';
import Toolbar from './toolbar';
import Filters from './filters';
import { TabContext } from '../routes/test';

const SecondaryTabs = ({ labels, contents }) => {
    const [activeSecTab, setActiveSecTab] = useState(0);
    useLayoutEffect(() => setActiveSecTab(0), [labels])

    return (
        <div className='secondary-tab-wrapper col'>
            <div className='secondary-tab-labels row'>
                {labels.map((label, i) =>
                    <div key={label}
                        className={`secondary-tab ${activeSecTab == i ? "active" : ""}`}
                        onClick={() => setActiveSecTab(i)}>
                        {label}
                    </div>
                )}
            </div>
            <div>{contents[activeSecTab]}</div>
        </div>
    );
};

export default function TabContents() {
    const { tabContents, activeTab } = useContext(TabContext)
    let displayedContent = tabContents[activeTab]
    let labels = Object.keys(displayedContent)
    let contents = Object.values(displayedContent)

    return (
        <div className="sec-tab-wrapper">
            <Filters />
            <Toolbar />
            <SecondaryTabs labels={labels} contents={contents} />
        </div>
    )
}
