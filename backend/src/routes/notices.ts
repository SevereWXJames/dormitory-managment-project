import express, {type Request, type Response} from "express";
import {getCreditBalanceByUserId, getTransactionHistoryByUserId} from "../services/creditServices.ts";
import {getAllNotices, getNoticesForUserId} from "../services/noticeServices.ts";

const noticeRouter = express.Router();

noticeRouter.get("/", async (req: Request, res: Response)=> {
    try {
        const notices = await getAllNotices();
        return res.status(200).json({success: true, data: notices});
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal server error."});
    }
});

noticeRouter.get("/get-for-user/:userId", async (req: Request, res: Response)=> {
    if (req.params.userId === undefined) {
        return res.status(400).json({success: false, message: "No ID provided."});
    }

    try {
        const notices = await getNoticesForUserId(req.params.userId as string);
        return res.status(200).json({success: true, data: notices});
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal server error."});
    }
});


export default noticeRouter;