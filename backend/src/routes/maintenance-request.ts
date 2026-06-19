import express, {type Request, type Response, type NextFunction} from "express";
import {
    getAllMaintenanceRequests, getAllMaintenanceRequestsByUserId,
    getMaintenanceRequestStatusById,
    getMaintenanceRequestTypeById
} from "../services/maintenanceRequestServices.ts";

const maintenanceRequestRouter = express.Router();

maintenanceRequestRouter.get("/", async (req: Request, res: Response)=> {
    try {
        const maintenanceRequests = await getAllMaintenanceRequests();
        return res.status(200).json({success: true, data: maintenanceRequests});
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal server error."});
    }
});

maintenanceRequestRouter.get("/get-for-user/", async (req: Request, res: Response)=> {
    if (req.body.userId === undefined) {
        return res.status(400).json({success: false, message: "No ID provided."});
    }

    try {
        const maintenanceRequests = await getAllMaintenanceRequestsByUserId(req.body.userId as string);
        return res.status(200).json({success: true, data: maintenanceRequests});
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal server error."});
    }
});

maintenanceRequestRouter.get("/get-type-by-id/:typeId", async (req: Request, res: Response)=> {
    if (req.params.typeId === undefined) {
        return res.status(400).json({success: false, message: "No ID provided."});
    }

    try {
        const type = await getMaintenanceRequestTypeById(req.params.typeId as string);
        if (type === undefined) {
            return res.status(400).json({success: false, message: "Provided ID matches no status."});
        }
        return res.status(200).json({success: true, data: type});
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal server error."});
    }
});

maintenanceRequestRouter.get("/get-status-by-id/:statusId", async (req: Request, res: Response)=> {
    if (req.params.statusId === undefined) {
        return res.status(400).json({success: false, message: "No ID provided."});
    }

    try {
        const status = await getMaintenanceRequestStatusById(req.params.statusId as string);
        if (status === undefined) {
            return res.status(400).json({success: false, message: "Provided ID matches no status."});
        }
        return res.status(200).json({success: true, data: status});
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal server error."});
    }
});

export default maintenanceRequestRouter;