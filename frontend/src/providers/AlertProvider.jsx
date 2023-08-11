import { useState } from 'react'
import { AlertContext } from '../contexts/createContext';
import Alert from '../components/Alert';

const AlertProvider = ({ children }) => {
    const [alertInfo, setAlertInfo] = useState({
        display: false,
        type: "",
        message: "",
        action: null
    });

    const alertConfirm = (message, action) => {
        setAlertInfo({ display: true, type: "confirm", message, action })
    }
    const alertSuccess = (message) => {
        setAlertInfo({ display: true, type: "success", message })
    }
    const alertWarning = (message) => {
        setAlertInfo({ display: true, type: "warning", message })
    }
    const alertError = (message) => {
        setAlertInfo({ display: true, type: "error", message })
    }
    const closeAlert = () => {
        setAlertInfo({ display: false, type: "", message: "", action: null })
    }

    return (
        <AlertContext.Provider value={{ alertConfirm, alertSuccess, alertWarning, alertError, closeAlert }}>
            {
                alertInfo.display &&
                <Alert
                    type={alertInfo.type}
                    message={alertInfo.message}
                    action={alertInfo.action}
                />
            }
            {children}
        </AlertContext.Provider>
    );
}

export default AlertProvider;
