import { useContext } from "react";
import { AlertContext, AuthContext, TabContext, UpdateTabContext, TableDataContext, UpdateTableDataContext, TableStatesContext, UpdateTableStatesContext, SelectedDataContext } from "../contexts/createContext";

export const useAlertContext = () => { return useContext(AlertContext); }


export const useAuthContext = () => { return useContext(AuthContext); }

export const useTabContext = () => { return useContext(TabContext); }
export const useUpdateTabContext = () => { return useContext(UpdateTabContext); }



export const useTableDataContext = () => { return useContext(TableDataContext); }
export const useUpdateTableDataContext = () => { return useContext(UpdateTableDataContext); }

export const useTableStatesContext = () => { return useContext(TableStatesContext); }
export const useUpdateTableStatesContext = () => { return useContext(UpdateTableStatesContext); }
export const useSelectedDataContext = () => { return useContext(SelectedDataContext); }