import cron from "node-cron";
import {handleSlotUpdates} from "../services/reservationServices.ts";

const DEFAULT_RESET_HOUR = 2;

export default function setUpScheduledTasks() {
    let slotResetHour = Number(process.env.SLOT_RESET_HOUR);
    if (isNaN(slotResetHour)) slotResetHour = DEFAULT_RESET_HOUR;
    cron.schedule(`0 0 ${slotResetHour} * * *`, function () {
        console.log("Updating reservation slots...");
        handleSlotUpdates();
    });
}