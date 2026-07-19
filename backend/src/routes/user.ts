import express, {type Request, type Response} from "express";
import {getExistingUserFromId} from "../services/usersServices.ts";
import mongoose from "mongoose";

const userRouter = express.Router();

userRouter.get("/get-by-id/:userId", async (req: Request, res: Response) => {
    if (req.params.userId === undefined) {
        return res.status(400).json({success: false, message: "No ID provided."});
    }

    try {
        const user = await getExistingUserFromId(new mongoose.Types.ObjectId(req.params.userId as string));
        if (user === undefined) {
            return res.status(400).json({success: false, message: "Provided ID matches no user."});
        }
        return res.status(200).json({success: true, data: user});
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal server error."});
    }
});

export default userRouter;