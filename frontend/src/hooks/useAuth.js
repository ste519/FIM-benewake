import { useContext } from "react";
import { AuthContext } from "../js/createContext";

const useAuth = () => { return useContext(AuthContext); }
export default useAuth;