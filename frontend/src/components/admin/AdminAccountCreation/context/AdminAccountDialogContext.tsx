import {createContext} from "react";

const initialState = {
    isDialogOpen : false,
}

export const AdminAccountDialogContext = createContext(initialState);