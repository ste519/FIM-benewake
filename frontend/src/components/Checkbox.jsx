import { useState, useEffect } from 'react';
import useTabContext from '../hooks/useTabContext';

export default function Checkbox(props) {
    const { selectedRows } = useTabContext();
    const [checked, setChecked] = useState(props.checked);
    useEffect(() => setChecked(props.checked), [selectedRows])
    const handleChange = () => {
        if (!checked) props.addRow()
        else props.removeRow()
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