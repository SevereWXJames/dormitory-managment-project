import express, {} from "express";
import { getAllRooms, getRoomById, getRoomByUserId } from "../services/roomServices.ts";
const roomsRouter = express.Router();
roomsRouter.get("/", async (req, res) => {
    try {
        const rooms = await getAllRooms();
        return res.status(200).json({ success: true, data: rooms });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
});
roomsRouter.get("/get-by-id/:roomId", async (req, res) => {
    if (req.params.roomId === undefined) {
        return res.status(400).json({ success: false, message: "No ID provided." });
    }
    try {
        const room = await getRoomById(req.params.roomId);
        if (room === undefined) {
            return res.status(400).json({ success: false, message: "Provided ID matches no room." });
        }
        return res.status(200).json({ success: true, data: room });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
});
roomsRouter.get("/get-by-user/:userId", async (req, res) => {
    if (req.params.userId === undefined) {
        return res.status(400).json({ success: false, message: "No ID provided." });
    }
    try {
        const room = await getRoomByUserId(req.params.userId);
        if (room === undefined) {
            return res.status(400).json({ success: false, message: "Provided ID matches no room." });
        }
        return res.status(200).json({ success: true, data: room });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
});
export default roomsRouter;
//# sourceMappingURL=rooms.js.map