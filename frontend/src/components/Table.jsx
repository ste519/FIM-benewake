import React, { useState } from 'react';
import Filters from './Filters';

export default function Table({ data }) {
    const [open, setOpen] = useState(true)
    let headers = new Set();
    data.forEach((obj) => {
        Object.keys(obj).forEach(
            (key) => headers.add(key)
        )
    })
    headers = Array.from(headers)
    const createTds = (item) => {
        const tds = []
        for (let i = 0; i < headers.length; i++) {

            tds.push(<td key={i}></td >)
        }
        Object.keys(item).forEach((key, i) => {
            let colIndex = headers.indexOf(key)
            tds[colIndex] =
                <td key={key + i}>{Object.values(item)[i]}</td>
        })
        return tds
    }

    function toggleOpen() {
        setOpen(!open)
    }
    return (
        <div className="table-container">
            <button className="toggle-btn" onClick={toggleOpen}>Toggle</button>
            {open ? <Filters headers={headers} /> : null}
            <table>
                <thead>
                    <tr>
                        {headers.map((header, i) => <th key={i}>{header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) =>
                        <tr key={i}>
                            {createTds(item)}
                        </tr>
                    )}
                </tbody>
            </table >
        </div>
    )
}
