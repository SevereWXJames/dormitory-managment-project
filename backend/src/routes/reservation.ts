import express, {type Request, type Response, type NextFunction} from "express";
import {getReservationsBookedByUserId, getReservationsSlotsByServiceId} from "../services/reservationServices.ts";

const reservationRouter = express.Router();

reservationRouter.get("/", async (req: Request, res: Response)=> {
    return res.status(501).json({});
});

reservationRouter.get("/get-booked-by-user/:userId", async (req: Request, res: Response)=> {
    if (req.params.userId === undefined) {
        return res.status(400).json({success: false, message: "No ID provided."});
    }

    try {
        const reservationSlots = await getReservationsBookedByUserId(req.params.userId as string);
        return res.status(200).json({success: true, data: reservationSlots});
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal server error."});
    }
});

reservationRouter.get("/get-slots-by-service/:serviceId", async (req: Request, res: Response)=> {
    if (req.params.serviceId === undefined) {
        return res.status(400).json({success: false, message: "No ID provided."});
    }

    try {
        const reservationSlots = await getReservationsSlotsByServiceId(req.params.serviceId as string);
        return res.status(200).json({success: true, data: reservationSlots});
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal server error."});
    }
});

export default reservationRouter;