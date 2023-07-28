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
        action: null
    });


    return (
        <AlertContext.Provider value={updateAlertInfo}>
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
