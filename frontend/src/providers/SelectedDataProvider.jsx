
import { useState, } from "react";
import { SelectedDataContext } from '../contexts/createContext';

const SelectedDataProvider = ({ children }) => {
    const [selectedData, setSelectedData] = useState();

    const [selectedQuery, setSelectedQuery] = useState()
    return (
        <SelectedDataContext.Provider value={{ selectedData, setSelectedData, selectedQuery, setSelectedQuery }}>
            {children}
        </SelectedDataContext.Provider>
    );
}

export default SelectedDataProvider;