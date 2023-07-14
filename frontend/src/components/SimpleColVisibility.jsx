import React from 'react'

const SimpleColVisibility = ({ visibility, setVisibility }) => {
    const handleChange = (name) => {
        setVisibility({ ...visibility, [name]: !visibility[name] })
    }

    return (
        <div className="col visibility-wrapper">
            {/* <label>
                        <input
                            type="checkbox"
                            name="visibilityAll"
                        />
                        全选
                    </label> */}
            {
                Object.keys(visibility).map(
                    name =>
                        <label key={name}>
                            <input
                                type='checkbox'
                                name={name}
                                checked={visibility[name]}
                                onChange={() => handleChange(name)}
                            />
                            {name}
                        </label>
                )}
        </div>
    )
}

export default SimpleColVisibility;
