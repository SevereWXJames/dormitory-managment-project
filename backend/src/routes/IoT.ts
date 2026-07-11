import express, {type Request, type Response, type NextFunction} from "express"
import {
    getEventsForLastNDays, getStatusForServiceByUUID,
    getStatusForServiceId,
} from "../services/IoT/IoTDataServices.ts";

const IoTRouter = express.Router();

IoTRouter.get("/get-status-by-id/:serviceId", async (req: Request, res: Response)=> {
    try {
        const serviceId = req.params.serviceId;
        if (typeof serviceId !== "string") {
            return res.status(400).json({success: false, message: "Invalid ID."})
        }
        const status = await getStatusForServiceId(serviceId);

        if (status === null) {
            return res.status(400).json({success: false, message: "That ID matches no status."});
        }
        return res.status(200).json({success: true, data: status});
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal server error."});
    }
});

IoTRouter.get(`/get-status-by-service-uuid/:iotUUID}`, async (req: Request, res: Response)=> {
    try {
        const {iotUUID} = req.params
        if (typeof iotUUID !== "string" || !iotUUID) {
            return res.status(400).json({success: false, message: "Invalid uuid."})
        }
        const status = await getStatusForServiceByUUID(iotUUID);

        if (status === null) {
            return res.status(400).json({success: false, message: "That service uuid matches no status."});
        }
        return res.status(200).json({success: true, data: status});
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal server error.", error: error});
    }
});

IoTRouter.post("/get-events-from-n-days-ago", async (req: Request, res: Response)=> {
    try {
        const {daysAgo} = req.body;
        if (typeof daysAgo !== "number") {
            return res.status(400).json({success: false, message: "Invalid days provided."})
        }
        const events = await getEventsForLastNDays(daysAgo);
        return res.status(200).json({success: true, data: events});
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error."});
    }
});

export default IoTRouter;