import express, {type Request, type Response, type NextFunction} from "express"
import {
    getEventsForLastNDays,
    getStatusForServiceId,
    getStatusForServiceName
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

IoTRouter.get("/get-status-by-service-name/", async (req: Request, res: Response)=> {
    try {
        const {serviceName} = req.params
        if (typeof serviceName !== "string" || !serviceName) {
            return res.status(400).json({success: false, message: "Invalid name."})
        }
        const status = await getStatusForServiceName(serviceName);

        if (status === null) {
            return res.status(400).json({success: false, message: "That service name matches no status."});
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