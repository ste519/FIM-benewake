import React, {useState} from 'react';
import Tabs from '../components/tabs';
import Sidebar from '../components/sidebar';

export default function Test() {
    return (
        <div id="test" className="container">
            <Sidebar />
            <Tabs />
        </div>
    )
}