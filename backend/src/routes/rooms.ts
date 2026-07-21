import express, {type Request, type Response, type NextFunction} from "express";
import {getAllRooms, getRoomById, getRoomByUserId} from "../services/roomServices.ts";
import mongoose from "mongoose";

const roomsRouter = express.Router();

roomsRouter.get("/", async (req: Request, res: Response)=> {
    try {
        const rooms = await getAllRooms();
        return res.status(200).json({success: true, data: rooms});
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal server error."});
    }
});

roomsRouter.get("/get-by-id/:roomId", async (req: Request, res: Response)=> {
    if (req.params.roomId === undefined) {
        return res.status(400).json({success: false, message: "No ID provided."});
    }

    try {
        const room = await getRoomById(new mongoose.Types.ObjectId(req.params.roomId as string));
        if (room === undefined) {
            return res.status(400).json({success: false, message: "Provided ID matches no room."});
        }
        return res.status(200).json({success: true, data: room});
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal server error."});
    }
});

roomsRouter.get("/get-by-user/:userId", async (req: Request, res: Response)=> {
    if (req.params.userId === undefined) {
        return res.status(400).json({success: false, message: "No ID provided."});
    }

    try {
        const room = await getRoomByUserId(new mongoose.Types.ObjectId(req.params.userId as string));
        if (room === undefined) {
            return res.status(400).json({success: false, message: "Provided ID matches no room."});
        }
        return res.status(200).json({success: true, data: room});
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal server error."});
    }
});

export default roomsRouter;