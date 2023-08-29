import { useState } from 'react';
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow-down.svg';
import { ReactComponent as StarIcon } from '../assets/icons/star.svg'

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
                <ArrowIcon className={`icon__small arrow-icon ${isOpen ? "arrow-down" : "arrow-up"}`} />
            </div>

            {isOpen &&
                <ul className="dropdown-menu">
                    {props.items.map(
                        (item, i) =>
                            <li className="dropdown-item" key={"item" + i} onClick={() => handleItemClick(item)}>
                                <StarIcon className="icon__small star-icon" />
                                {item}
                            </li>)
                    }
                </ul>}
        </li>
    )
}