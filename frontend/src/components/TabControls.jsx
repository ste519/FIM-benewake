import React, { useState } from 'react';
import useTabContext from '../context/TabProvider';
import { useLocation } from 'react-router-dom';
import Filters from './Filters';
import Presets from './Presets';
import Toolbar from './Toolbar';
import axios from 'axios';

const SecTabs = ({ labels }) => {
    const [activeSecTab, setActiveSecTab] = useState();

    const handleSecTabClick = (label) => {
        setActiveSecTab(label);
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

const TabControls = ({ path }) => {
    const secTabLabels = ["已完成", '未过期未完成', '已过期未完成']
    const [presets, setPresets] = useState(
        [{ name: "我的", type: "system" },
        { name: "全部", type: "system" }]
    )
    return (
        <div>
            <div className="tab-contents">
                <Toolbar path={path} />
                <SecTabs labels={secTabLabels} path={path} />
                <div className="col presets-n-filters bordered">
                    <Presets
                        presets={presets}
                        secTabs={secTabLabels}
                        editable
                        path={path}
                    />
                    {/* <Filters /> */}
                </div>
            </div>
        </div>
    )
}

export default TabControls;
