import { useState, useEffect } from 'react';

export default function Checkbox({ addRow, removeRow, isSelected }) {
    const [checked, setChecked] = useState(isSelected);
    useEffect(() => setChecked(isSelected), [isSelected])
    const handleChange = () => {
        if (!checked) addRow()
        else removeRow()
        setChecked(!checked);
    };

    return (
        <input
            type="checkbox"
            checked={checked}
            onChange={handleChange}
        />
    );
};