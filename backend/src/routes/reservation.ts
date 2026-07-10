import express, {type Request, type Response, type NextFunction} from "express";
import {
    bookReservationSlot,
    getAllFreeSlots, getAllReservedSlots,
    getReservationsBookedByUserId,
    getReservationsSlotsByServiceId
} from "../services/reservationServices.ts";

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

reservationRouter.get("/get-free-slots-by-service/:serviceId", async (req: Request, res: Response)=> {
    if (req.params.serviceId === undefined) {
        return res.status(400).json({success: false, message: "No ID provided."});
    }

    try {
        const reservationSlots = await getAllFreeSlots(req.params.serviceId as string);
        return res.status(200).json({success: true, data: reservationSlots});
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal server error.", error: error});
    }
});

reservationRouter.get("/get-all-reserved-slots-by-service/:serviceId", async (req: Request, res: Response)=> {
    if (req.params.serviceId === undefined) {
        return res.status(400).json({success: false, message: "No ID provided."});
    }

    try {
        const reservationSlots = await getAllReservedSlots(req.params.serviceId as string);
        return res.status(200).json({success: true, data: reservationSlots});
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal server error.", error: error});
    }
});

reservationRouter.put("/book-slot-by-service/:serviceId", async (req: Request, res: Response)=> {
    const {slotId} = req.body;
    const {id} = req.user;
    const {serviceId} = req.params;

    if (!serviceId) {
        return res.status(400).json({success: false, message: "No ID provided."});
    }
    if(!slotId){
        return res.status(400).json({success: false, message: "No slot provided."});
    }

    try {
        const reservationSlots = await bookReservationSlot(serviceId, slotId, id);
        return res.status(200).json({success: true, data: reservationSlots});
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal server error.", error: error});
    }
});

export default reservationRouter;