import React from 'react'

export default function DataPoint({ description, value }) {
    return (
        <div className='data-point span1'>
            <h2>{description}</h2>
            <h1>{value}</h1>
        </div>
    )
}
