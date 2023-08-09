import React, { useRef, useLayoutEffect, useState } from 'react';

export default function AutoWidthInput({ value, onChange }) {
    const inputRef = useRef(null);
    const spanRef = useRef(null);
    const [inputWidth, setInputWidth] = useState('auto');

    useLayoutEffect(() => {
        if (spanRef.current) {
            setInputWidth(`${spanRef.current.offsetWidth}px`);
        }
    }, [value]);

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <input
                ref={inputRef}
                value={value}
                onChange={onChange}
                style={{ width: inputWidth, transition: "width 0.2s" }}
            />
            <span
                ref={spanRef}
                style={{
                    visibility: 'hidden',
                    position: 'absolute',
                    whiteSpace: 'pre',
                    fontSize: 'inherit',
                }}
            >
                {value}&nbsp;
            </span>
        </div>
    );
}
