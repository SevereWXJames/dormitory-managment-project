// useReservationForm.ts
import { useState } from "react";
import type { SelectChangeEvent } from "@mui/material/Select";

export function useCheckMachineStatus() {
    const [machine, setMachine] = useState("");
    const [open, setOpen] = useState(false);

    const handleChange = (event: SelectChangeEvent) => {
        setMachine(event.target.value as string);
    };

    const onSubmit = () => {
        setMachine(machine);
        setOpen(true);
        console.log("Checking machine status")
    };

    const onClose = () => {
        setOpen(false);
    };

    return {
        machine,
        open, setOpen,
        handleChange,
        onSubmit,
        onClose
    };
}