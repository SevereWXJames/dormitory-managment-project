import express, {type Request, type Response, type NextFunction} from "express";
import {
    getAllMaintenanceRequests, getAllMaintenanceRequestsByUserId,
    getAllMaintenanceRequestTypes, getAllMaintenanceRequestStatuses, getMaintenanceRequestPriorityById,
    getMaintenanceRequestStatusById,
    getMaintenanceRequestTypeById, getAllMaintenanceRequestPriorities,
    addMaintenanceRequest, setMaintenanceRequestStatus
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

maintenanceRequestRouter.get("/get-for-user/:userId", async (req: Request, res: Response)=> {
    if (req.params.userId === undefined) {
        return res.status(400).json({success: false, message: "No ID provided."});
    }

    try {
        const maintenanceRequests = await getAllMaintenanceRequestsByUserId(req.params.userId as string);
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

maintenanceRequestRouter.get("/get-types/", async (req: Request, res: Response)=> {
    try {
        const types = await getAllMaintenanceRequestTypes();
        return res.status(200).json({success: true, data: types});
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

maintenanceRequestRouter.get("/get-statuses/", async (req: Request, res: Response)=> {
    try {
        const statuses = await getAllMaintenanceRequestStatuses();
        return res.status(200).json({success: true, data: statuses});
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal server error."});
    }
});

maintenanceRequestRouter.patch("/:requestId/status", async (req: Request, res: Response) => {
    const { statusId } = req.body as { statusId?: string };

    if (!statusId) {
        return res.status(400).json({success: false, message: "No status provided."});
    }

    try {
        await setMaintenanceRequestStatus(req.params.requestId as string, statusId);
        return res.status(200).json({success: true, data: {message: "Status updated successfully."}});
    }
    catch (error) {
        return res.status(500).json({success: false, message: error instanceof Error ? error.message : "Internal server error."});
    }
});

maintenanceRequestRouter.get("/get-priority-by-id/:priorityId", async (req: Request, res: Response)=> {
    if (req.params.priorityId === undefined) {
        return res.status(400).json({success: false, message: "No ID provided."});
    }

    try {
        const priority = await getMaintenanceRequestPriorityById(req.params.priorityId as string);
        if (priority === undefined) {
            return res.status(400).json({success: false, message: "Provided ID matches no status."});
        }
        return res.status(200).json({success: true, data: priority});
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal server error."});
    }
});

maintenanceRequestRouter.get("/get-priorities/", async (req: Request, res: Response)=> {
    try {
        const priorities = await getAllMaintenanceRequestPriorities();
        return res.status(200).json({success: true, data: priorities});
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal server error."});
    }
});

maintenanceRequestRouter.put("/", async (req: Request, res: Response) => {
    try {
        console.log(`maintenance req: ${JSON.stringify(req.body)}`);
        const result = await addMaintenanceRequest(req.body);
        return res.status(200).json({success: true});
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal server error."});
    }
});

export default maintenanceRequestRouter;