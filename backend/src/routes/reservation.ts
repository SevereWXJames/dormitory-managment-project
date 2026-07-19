import express, {type Request, type Response} from "express";
import {
    bookReservationSlot, bookReservationSlotByName, cancelReservationSlot, cancelReservationSlotByName,
    getAllFreeSlots, getAllReservedSlots,
    getReservationsBookedByUserId,
    getReservationsSlotsByServiceId, getReservationsSlotsByServiceName
} from "../services/reservationServices.ts";
import mongoose from "mongoose";

const reservationRouter = express.Router();

reservationRouter.get("/", async (req: Request, res: Response)=> {
    return res.status(501).json({});
});

reservationRouter.get("/get-booked-by-user/:userId", async (req: Request, res: Response)=> {
    if (req.params.userId === undefined) {
        return res.status(400).json({success: false, message: "No ID provided."});
    }

    try {
        const reservationSlots = await getReservationsBookedByUserId(new mongoose.Types.ObjectId(req.params.userId as string));
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
        const reservationSlots = await getReservationsSlotsByServiceId(new mongoose.Types.ObjectId(req.params.serviceId as string));
        return res.status(200).json({success: true, data: reservationSlots});
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal server error."});
    }
});

reservationRouter.get("/get-slots-by-service-name/:serviceName", async (req: Request, res: Response)=> {
    if (req.params.serviceName === undefined) {
        return res.status(400).json({success: false, message: "No name provided."});
    }

    try {
        const reservationSlots = await getReservationsSlotsByServiceName(req.params.serviceName as string);
        return res.status(200).json({success: true, data: reservationSlots});
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal server error.", error: error});
    }
});

reservationRouter.get("/get-free-slots-by-service/:serviceId", async (req: Request, res: Response)=> {
    if (req.params.serviceId === undefined) {
        return res.status(400).json({success: false, message: "No ID provided."});
    }

    try {
        const reservationSlots = await getAllFreeSlots(new mongoose.Types.ObjectId(req.params.serviceId as string));
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
        const reservationSlots = await getAllReservedSlots(new mongoose.Types.ObjectId(req.params.serviceId as string));
        return res.status(200).json({success: true, data: reservationSlots});
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal server error.", error: error});
    }
});

reservationRouter.put("/book-slot-by-service/:serviceId", async (req: Request, res: Response)=> {
    const {userId, slotId} = req.body;
    const {serviceId} = req.params;

    if (!serviceId) {
        return res.status(400).json({success: false, message: "No ID provided."});
    }
    if(!slotId){
        return res.status(400).json({success: false, message: "No slot provided."});
    }

    try {
        const reservationSlots = await bookReservationSlot(new mongoose.Types.ObjectId(serviceId as string), new mongoose.Types.ObjectId(slotId as string), new mongoose.Types.ObjectId(userId as string));
        return res.status(200).json({success: true,  data: reservationSlots});
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal server error.", error: error});
    }
});

reservationRouter.put("/book-slot-by-service-name", async (req: Request, res: Response)=> {
    const {userId, slotId, serviceName} = req.body;
    console.log(`req: ${JSON.stringify(req.body)}`);
    if (!serviceName) {
        return res.status(500).json({success: false, error: "No service name provided."});
    }
    if(!slotId){
        return res.status(500).json({success: false, error: "No slot provided."});
    }

    try {
        const reservationSlots = await bookReservationSlotByName(serviceName, slotId, userId);
        return res.status(200).json({success: true,  data: reservationSlots});
    }
    catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({success: false, message: "Internal server error.", error: error});
    }
});

reservationRouter.put("/cancel-booking-by-service/:serviceId", async (req: Request, res: Response)=> {
    const {userId, slotId} = req.body;
    const {serviceId} = req.params;

    if (!serviceId) {
        return res.status(400).json({success: false, message: "No ID provided."});
    }
    if(!slotId){
        return res.status(400).json({success: false, message: "No slot provided."});
    }

    try {
        const reservationSlots = await cancelReservationSlot(new mongoose.Types.ObjectId(serviceId as string), new mongoose.Types.ObjectId(slotId as string), new mongoose.Types.ObjectId(userId as string));
        return res.status(200).json({success: true,  data: reservationSlots});
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal server error.", error: error});
    }
});

reservationRouter.put("/cancel-booking-by-service-name/", async (req: Request, res: Response)=> {
    const {userId, slotId, serviceName} = req.body;
    if (!serviceName) {
        return res.status(500).json({success: false, error: "No service name provided."});
    }
    if(!slotId){
        return res.status(500).json({success: false, error: "No slot provided."});
    }

    try {
        const reservationSlots = await cancelReservationSlotByName(serviceName, slotId, userId);
        return res.status(200).json({success: true,  data: reservationSlots});
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal server error.", error: error});
    }
});

export default reservationRouter;