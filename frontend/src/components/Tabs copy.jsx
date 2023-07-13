import React, { useState } from 'react';
import Toolbar from './toolbar';
import Table from './Table';
import response from '../test/test.json'
import useTabContext from '../context/TabProvider';

export default function Tabs() {
    const { tabContents, activeTab, setTabContents } = useTabContext();
    const labels = ["已完成", '未过期未完成', '已过期未完成']
    const [activeSecTab, setActiveSecTab] = useState(labels[0]);

    const handleSecTabClick = (label) => {
        setActiveSecTab(label);
        setTabContents({ ...tabContents, [activeTab]: response })
    }

    return (
        <div className="tab-container">
            <Toolbar />
            <div className="tab-contents">
                <div className="sec-tab-wrapper row">
                    {labels.map((label, i) =>
                        <div key={i}
                            className={`secondary-tab ${activeSecTab === label ? "active" : ""}`}
                            onClick={() => handleSecTabClick(label)}>
                            {label}
                        </div>
                    )}
                </div>
                {tabContents[activeTab] && tabContents[activeTab].length > 0 ?
                    <Table data={tabContents[activeTab]} /> : null}
            </div>
        </div>
    )
}
