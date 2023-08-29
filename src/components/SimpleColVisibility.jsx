
import colNameDict from '../constants/ColNameDict.json'
import { VISIBILITY_ALL_FALSE, VISIBILITY_ALL_TRUE } from '../constants/Global';

const SimpleColVisibility = ({ visibility, setVisibility }) => {

    const toggleSelectAll = () => {
        if (Object.values(visibility).includes(false)) {
            setVisibility(VISIBILITY_ALL_TRUE)
        }
        else {
            setVisibility(VISIBILITY_ALL_FALSE)
        }
    }
    const handleChange = (name) => {
        setVisibility({ ...visibility, [name]: !visibility[name] })
    }

    return (
        <div className="col simple-visibility-wrapper">
            <div className='row mb1' >
                <h1>默认显示列：</h1>
                <label key="-1">
                    <input
                        type="checkbox"
                        name="visibilityAll"
                        checked={!Object.values(visibility).includes(false)}
                        onChange={toggleSelectAll}
                    />
                    全选
                </label>
            </div>
            <div className='col-selection'>
                {
                    colNameDict.map(
                        col =>
                            <label key={col.col_id}>
                                <input
                                    type='checkbox'
                                    name={"visibility" + col.col_id}
                                    checked={visibility[col.col_name_ENG]}
                                    onChange={() => handleChange(col.col_name_ENG)}
                                />
                                {col.col_name_CN}
                            </label>
                    )}
            </div>
        </div>
    )
}

export default SimpleColVisibility;