import React from 'react';

export default function Dropdown(props) {
    const [open, setOpen] = React.useState(false);

    const [isSelected, setIsSelected] = React.useState(false)
    const handleClick = () => {
        setOpen(!open);
        setIsSelected(!isSelected);
    };

    const [itemSelected, setItemSelected] = React.useState(-1)
    const handleItemClick = (i) => {
        console.log(i);
        if (i == itemSelected) {
            setItemSelected(-1)
        }
        else {
            setItemSelected(i)
        }
    }
    return (
        <ul className={`dropdown ${isSelected ? "selected" : ""}`} >
            <div className="title" onClick={handleClick}>
                {props.title}
                {props.menuItem.length > 0 ?
                    (open ?
                        <span className="icon__small arrow-up" title="arrow up"></span> :
                        <span className="icon__small arrow-down" title="arrow down"></span>
                    ) : null}
            </div>

            <ul class="dropdown-menu">{props.menuItem.map(
                (item, i) =>
                    i == itemSelected ?
                        <div className="dropdown-item selected" key={i} onClick={() => handleItemClick(i)} >{item}</div> :
                        <div className="dropdown-item" key={i} onClick={() => handleItemClick(i)} >{item}</div>)
            }
            </ul>
        </ul >
    )
}