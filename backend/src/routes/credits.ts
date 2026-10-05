import express, {type Request, type Response} from "express";
import {addCredits, getCreditBalanceByUserId, getTransactionHistoryByUserId} from "../services/creditServices.ts";
import mongoose from "mongoose";

const creditRouter = express.Router();

creditRouter.get("/get-for-user/:userId", async (req: Request, res: Response)=> {
    if (req.params.userId === undefined) {
        return res.status(400).json({success: false, message: "No ID provided."});
    }

    try {
        const balance = await getCreditBalanceByUserId(new mongoose.Types.ObjectId(req.params.userId as string));
        if (balance === undefined) {
            return res.status(400).json({success: false, message: "Provided ID matches no status."});
        }
        return res.status(200).json({success: true, data: balance});
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal server error."});
    }
});

creditRouter.get("/get-transaction-history/:userId", async (req: Request, res: Response)=> {
    if (req.params.userId === undefined) {
        return res.status(400).json({success: false, message: "No ID provided."});
    }

    try {
        const transactions = await getTransactionHistoryByUserId(new mongoose.Types.ObjectId(req.params.userId as string));
        return res.status(200).json({success: true, data: transactions});
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal server error."});
    }
});

creditRouter.put("/add-credits/:userId", async (req: Request, res: Response) => {
    if (req.params.userId === undefined) {
        return res.status(400).json({success: false, message: "No ID provided."});
    }

    try {
        const {amount} = req.body;
        const {userId} = req.params;
        if (amount === undefined || amount <= 0) {
            return res.status(400).json({success: false, message: "Invalid input."});
        }
        await addCredits(new mongoose.Types.ObjectId(userId as string), amount);
        return res.status(200).json({success: true});
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal server error."});
    }
});

export default creditRouter;