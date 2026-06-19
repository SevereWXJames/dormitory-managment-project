import express, {type Request, type Response} from "express";
import {getAllServices, getServiceById} from "../services/serviceServices.ts";

const servicesRouter = express.Router();

servicesRouter.get("/", async (req: Request, res: Response)=> {
    try {
        const services = await getAllServices();
        return res.status(200).json({success: true, data: services});
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal server error."});
    }
});

servicesRouter.get("/get-by-id/:serviceId", async (req: Request, res: Response)=> {
    if (req.params.serviceId === undefined) {
        return res.status(400).json({success: false, message: "No ID provided."});
    }

    try {
        const service = await getServiceById(req.params.serviceId as string);
        if (service === undefined) {
            return res.status(400).json({success: false, message: "Provided ID matches no service."});
        }
        return res.status(200).json({success: true, data: service});
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal server error."});
    }
});

export default servicesRouter;