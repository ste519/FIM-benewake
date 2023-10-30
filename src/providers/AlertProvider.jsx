import { useReducer } from 'react'
import { AlertContext } from '../contexts/createContext';
import Alert from '../components/Alert';

const alertReducer = (state, action) => {
    switch (action.type) {
        case "CLOSE_ALERT":
            return { ...state, display: false }
        case "SHOW_ALERT":
            return { display: true, ...action.data }
        default:
            throw new Error('Unknown action type');
    }
}
const AlertProvider = ({ children }) => {
    const [alertInfo, updateAlertInfo] = useReducer(alertReducer, {
        display: false,
        type: "",
        message: "",
        action: null,
        cancel: null
    });

    const alertConfirm = (message, action, cancel) => updateAlertInfo({
        type: "SHOW_ALERT", data: { type: "confirm", message: message, action: action, cancel: cancel }
    })

    const alertSuccess = (message) => updateAlertInfo({
        type: "SHOW_ALERT", data: { type: "success", message: message }
    })

    const alertError = (message) => updateAlertInfo({
        type: "SHOW_ALERT", data: { type: "", message: message }
    })

    const alertWarning = (message) => updateAlertInfo({
        type: "SHOW_ALERT", data: { type: "", message: message }
    })


    return (
        <AlertContext.Provider value={{ alertConfirm, alertSuccess, alertError, alertWarning }}>
            {
                alertInfo.display &&
                <Alert
                    type={alertInfo.type}
                    message={alertInfo.message}
                    action={alertInfo.action}
                    cancel={alertInfo.cancel}
                />
            }
            {children}
        </AlertContext.Provider>
    );
}

export default AlertProvider;
