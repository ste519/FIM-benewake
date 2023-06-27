import { useState } from 'react';
import axios from 'axios';

export default function Dropdown(props) {
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        props.onClick();
        setIsOpen(!isOpen)
        console.log(isOpen);

        // let config = {
        //     method: 'get',
        //     maxBodyLength: Infinity,
        //     url: 'https://7543f923-7199-45a8-9a89-9099d9a650ae.mock.pstmn.io/testdata',
        //     headers: {}
        // };

        // axios.request(config)
        //     .then((response) => {
        //         console.log(JSON.stringify(response.data));
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

    }

    return (
        <li className="dropdown" >
            <div className={`dropdown-item ${props.active ? "active" : ""}`} onClick={handleClick}>
                {props.label}
                <span className={`icon__small arrow`} title="arrow icon"></span>
            </div>

            {isOpen &&
                <ul className="dropdown-menu">
                    {props.items.map(
                        (item, i) =>
                            <li className="dropdown-item" key={"item" + i} >{item}</li>)
                    }
                </ul>}
        </li>
    )
}