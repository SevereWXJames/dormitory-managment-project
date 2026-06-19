import express, {type Request, type Response, type NextFunction} from "express";

const IoTRouter = express.Router();

IoTRouter.get("/", async (req: Request, res: Response)=> {
    return res.status(501).json({});
});

IoTRouter.get("/get-by-datetime", (req: Request, res: Response)=> {
    return res.status(501).json({});
});

export default IoTRouter;