import {createContext, useContext} from "react";

const DialogOpenContext = createContext<boolean>(false);

export function useDialogOpen() {
    return useContext(DialogOpenContext);
}

export const DialogOpenProvider = DialogOpenContext.Provider;
