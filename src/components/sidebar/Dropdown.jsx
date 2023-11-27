import { useState } from 'react';
import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow-down.svg';
import { NavLink } from 'react-router-dom';
import { useUpdateTabContext } from '../../hooks/useCustomContext';

export default function Dropdown({ items, label, type }) {
    const [isOpen, setIsOpen] = useState(false);
    const updateTabs = useUpdateTabContext()

    const handleItemClick = (newTab) => {
        updateTabs({ type: "ADD_TAB", tab: newTab })
    }

    return (
        <div className="dropdown" >
            <div
                className='sidebar-item'
                onClick={() => setIsOpen(!isOpen)}>
                {label}
                <ArrowIcon className={`arrow-icon ${isOpen ? "arrow-up" : "arrow-down"}`} />
            </div>

            {isOpen &&
                <div className="dropdown-menu">
                    {items.map(
                        (item, i) =>
                            <NavLink
                                className="sidebar-item"
                                key={i}
                                onClick={() => handleItemClick(item)}
                                to={`/${type}/${item.path}`}>
                                {item.name}
                            </NavLink>)
                    }
                </div>}
        </div>
    )
}