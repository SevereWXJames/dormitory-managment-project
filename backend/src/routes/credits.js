import express, {} from "express";
import { getCreditBalanceByUserId, getTransactionHistoryByUserId } from "../services/creditServices.ts";
const creditRouter = express.Router();
creditRouter.get("/get-for-user/:userId", async (req, res) => {
    if (req.params.userId === undefined) {
        return res.status(400).json({ success: false, message: "No ID provided." });
    }
    try {
        const balance = await getCreditBalanceByUserId(req.params.userId);
        if (balance === undefined) {
            return res.status(400).json({ success: false, message: "Provided ID matches no status." });
        }
        return res.status(200).json({ success: true, data: balance });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
});
creditRouter.get("/get-transaction-history/:userId", async (req, res) => {
    if (req.params.userId === undefined) {
        return res.status(400).json({ success: false, message: "No ID provided." });
    }
    try {
        const transactions = await getTransactionHistoryByUserId(req.params.userId);
        return res.status(200).json({ success: true, data: transactions });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
});
export default creditRouter;
//# sourceMappingURL=credits.js.map