import { useState } from 'react';

export default function Dropdown(props) {
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        props.onClick(props.label);
        setIsOpen(!isOpen)
    }
    const handleItemClick = (newLabel) => {
        props.addTab(newLabel)
    }

    return (
        <li className="dropdown" >
            <div
                className={`dropdown-item ${props.selected ? "selected" : ""}`} onClick={handleClick}>
                {props.label}
                <span className={`icon__small arrow`} title="arrow icon"></span>
            </div>

            {isOpen &&
                <ul className="dropdown-menu">
                    {props.items.map(
                        (item, i) =>
                            <li className="dropdown-item" key={"item" + i} onClick={() => handleItemClick(item)}>{item}</li>)
                    }
                </ul>}
        </li>
    )
}