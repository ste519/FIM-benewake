
import ReactDatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import cn from 'date-fns/locale/zh-CN';
import { useRef, forwardRef } from "react";
import { ReactComponent as CalendarIcon } from '../assets/icons/calendar.svg'

registerLocale('zh-CN', cn)
setDefaultLocale('zh-CN');


const CustomInput = forwardRef((props, ref) => {
    return (
        <div className='custom-input' onClick={props.onClick}>
            <input type="text" readOnly name={props.name} value={props.value} ref={ref} />
            <CalendarIcon />
        </div>
    )
});

const DatePicker = (props) => {
    const inputRef = useRef(null)
    return (
        <ReactDatePicker {...props}
            customInput={<CustomInput ref={inputRef} name={props.name} />}
            dateFormat="yyyy/MM/dd"
        />
    )
}

export default DatePicker