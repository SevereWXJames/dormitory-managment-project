import express, {} from "express";
import { getReservationsBookedByUserId, getReservationsSlotsByServiceId } from "../services/reservationServices.ts";
const reservationRouter = express.Router();
reservationRouter.get("/", async (req, res) => {
    return res.status(501).json({});
});
reservationRouter.get("/get-booked-by-user/:userId", async (req, res) => {
    if (req.params.userId === undefined) {
        return res.status(400).json({ success: false, message: "No ID provided." });
    }
    try {
        const reservationSlots = await getReservationsBookedByUserId(req.params.userId);
        return res.status(200).json({ success: true, data: reservationSlots });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
});
reservationRouter.get("/get-slots-by-service/:serviceId", async (req, res) => {
    if (req.params.serviceId === undefined) {
        return res.status(400).json({ success: false, message: "No ID provided." });
    }
    try {
        const reservationSlots = await getReservationsSlotsByServiceId(req.params.serviceId);
        return res.status(200).json({ success: true, data: reservationSlots });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
});
export default reservationRouter;
//# sourceMappingURL=reservation.js.map