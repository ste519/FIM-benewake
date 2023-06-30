import React, { useState, useContext, useEffect } from 'react';
import Toolbar from './Toolbar';
import { TabContext } from '../routes/test';
import Table from './Table';
import axios from 'axios';

export default function TabContents() {
    const { tabContents, activeTab, setTabContents } = useContext(TabContext)
    const labels = ["已完成", '未过期未完成', '已过期未完成']
    const [activeSecTab, setActiveSecTab] = useState(labels[0]);
    const handleSecTabClick = (label) => {

        let config = {
            method: 'get',
            url: 'https://7543f923-7199-45a8-9a89-9099d9a650ae.mock.pstmn.io/testdata',
        };
        setActiveSecTab(label);

        axios.request(config)
            .then((response) => {

                setTabContents({ ...tabContents, [activeTab]: response.data })
            })
            .catch((error) => {
                console.log(error);
            });

    }



    return (
        <div>
            <Toolbar />
            <div className="sec-tab-wrapper row">
                {labels.map((label, i) =>
                    <div key={i}
                        className={`secondary-tab ${activeSecTab === label ? "active" : ""}`}
                        onClick={() => handleSecTabClick(label)}>
                        {label}
                    </div>
                )}
            </div>
            {tabContents[activeTab] ?
                <Table data={tabContents[activeTab]} /> : null}
        </div>
    )
}
