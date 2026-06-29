import express, {} from "express";
import { getAllMaintenanceRequests, getAllMaintenanceRequestsByUserId, getAllMaintenanceRequestTypes, getAllMaintenanceRequestStatuses, getMaintenanceRequestPriorityById, getMaintenanceRequestStatusById, getMaintenanceRequestTypeById, getAllMaintenanceRequestPriorities } from "../services/maintenanceRequestServices.ts";
const maintenanceRequestRouter = express.Router();
maintenanceRequestRouter.get("/", async (req, res) => {
    try {
        const maintenanceRequests = await getAllMaintenanceRequests();
        return res.status(200).json({ success: true, data: maintenanceRequests });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
});
maintenanceRequestRouter.get("/get-for-user/", async (req, res) => {
    if (req.body.userId === undefined) {
        return res.status(400).json({ success: false, message: "No ID provided." });
    }
    try {
        const maintenanceRequests = await getAllMaintenanceRequestsByUserId(req.body.userId);
        return res.status(200).json({ success: true, data: maintenanceRequests });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
});
maintenanceRequestRouter.get("/get-type-by-id/:typeId", async (req, res) => {
    if (req.params.typeId === undefined) {
        return res.status(400).json({ success: false, message: "No ID provided." });
    }
    try {
        const type = await getMaintenanceRequestTypeById(req.params.typeId);
        if (type === undefined) {
            return res.status(400).json({ success: false, message: "Provided ID matches no status." });
        }
        return res.status(200).json({ success: true, data: type });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
});
maintenanceRequestRouter.get("/get-types/", async (req, res) => {
    try {
        const types = await getAllMaintenanceRequestTypes();
        return res.status(200).json({ success: true, data: types });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
});
maintenanceRequestRouter.get("/get-status-by-id/:statusId", async (req, res) => {
    if (req.params.statusId === undefined) {
        return res.status(400).json({ success: false, message: "No ID provided." });
    }
    try {
        const status = await getMaintenanceRequestStatusById(req.params.statusId);
        if (status === undefined) {
            return res.status(400).json({ success: false, message: "Provided ID matches no status." });
        }
        return res.status(200).json({ success: true, data: status });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
});
maintenanceRequestRouter.get("/get-statuses/", async (req, res) => {
    try {
        const statuses = await getAllMaintenanceRequestStatuses();
        return res.status(200).json({ success: true, data: statuses });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
});
maintenanceRequestRouter.get("/get-priority-by-id/:priorityId", async (req, res) => {
    if (req.params.priorityId === undefined) {
        return res.status(400).json({ success: false, message: "No ID provided." });
    }
    try {
        const priority = await getMaintenanceRequestPriorityById(req.params.priorityId);
        if (priority === undefined) {
            return res.status(400).json({ success: false, message: "Provided ID matches no status." });
        }
        return res.status(200).json({ success: true, data: priority });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
});
maintenanceRequestRouter.get("/get-priorities/", async (req, res) => {
    try {
        const priorities = await getAllMaintenanceRequestPriorities();
        return res.status(200).json({ success: true, data: priorities });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
});
export default maintenanceRequestRouter;
//# sourceMappingURL=maintenance-request.js.map