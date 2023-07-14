import { useContext } from "react"
import { TabContext } from "../js/createContext"

const useTabContext = () => {
    return useContext(TabContext)
}

export default useTabContext;
