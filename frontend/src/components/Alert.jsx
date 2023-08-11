import React from 'react'
import { useAlertContext } from '../hooks/useCustomContext';

export default function Alert({ type, message, action }) {
    const {closeAlert} = useAlertContext()

    const handleConfirm = () => {
        if (action) {
            action();
        }
        closeAlert();
    }

    function getHeading() {
        switch (type) {
            case "warning":
                return "提示";
            case "error":
                return "错误";
            case "success":
                return "成功";
            case "confirm":
                return "确认";
            default:
                return "提示"
        }
    }

    return (
        <div className='popup-container flex-center'>
            <div className={`${type} col alert-container`}>
                <h1>{getHeading()}</h1>
                <p>{message}</p>
                <div className='row btn-wrapper'>
                    {action ?
                        <>
                            <button onClick={closeAlert} className='white small'>取消</button>
                            <button onClick={handleConfirm} className='blue60 small'>确认</button>
                        </>
                        : <button onClick={closeAlert} className='white small'>确认</button>
                    }
                </div>
            </div>
        </div >
    )
}
