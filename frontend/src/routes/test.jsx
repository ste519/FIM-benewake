import React, { useState, useEffect } from 'react';
import TabLabels from '../components/tabLabels';
import Sidebar from '../components/Sidebar';
import Loader from '../components/loader';
import TabContents from '../components/tabContents';
import { createContext } from 'react';
import axios from 'axios';


export const TabContext = createContext(null);

export default function Test() {

    const [tabLabels, setTabLabels] = useState([])
    const [activeTab, setActiveTab] = useState(null)
    const [tabContents, setTabContents] = useState({})

    const addTab = (newLabel) => {
        if (!tabLabels.includes(newLabel)) {
            setTabLabels([...tabLabels, newLabel]);
        }
        setActiveTab(newLabel)
        console.log(newLabel);

        let type;
        switch (newLabel) {
            case "生产计划":
                type = "scjh";
                break
            case "销售计划":
                type = 'xsjh';
                break
            default:
                type = 'default';
                break
        }

        let config = {
            method: 'get',
            url: 'https://7543f923-7199-45a8-9a89-9099d9a650ae.mock.pstmn.io/testdata',
            params: {
                "type": type
            }
        };

        axios.request(config)
            .then((response) => {
                setTabContents({ ...tabContents, [newLabel]: response.data })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const removeTab = (removedLabel) => {
        setTabLabels(tabLabels.filter((label) => { return label !== removedLabel }));
        setActiveTab(null);
        console.log("Removed " + removedLabel);
    }

    return (
        <TabContext.Provider value={{ 
            tabLabels, setTabLabels, 
            activeTab, setActiveTab, 
            tabContents, setTabContents }}>
            <div id="test" className="container">
                <Sidebar addTab={addTab} />
                <div className="container tab-container">
                    {tabLabels.length > 0 ?
                        <TabLabels /> : null}
                    {activeTab && tabContents[activeTab] ?
                        <TabContents /> : <Loader />}
                </div>
            </div>
        </TabContext.Provider>
    )
}
