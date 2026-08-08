import express from "express";
import {createAdmin} from "../services/adminServices.ts";

const adminRouter = express.Router();

adminRouter.post("/create-admin", async (req, res) => {
    try{
        const { name, username, email, password, phoneNumber} = req.body;
        const profileData = {name, username, email, password, phoneNumber, roles:[]};
        const user = await createAdmin(profileData);
        res.status(200).json({
            message: "Successfully created account!",
            data: {
                _id: user._id,
                username: user.username,
                email: user.email,
                roles: user.roles,
            },
            type: "success",
        });
    }catch(error){
        const message = error instanceof Error ? error.message : String(error);
        const statusCode = /required|invalid email|not match|not found|incorrect password|already exists|failed to create account|unable to update/i.test(message) ? 400 : 500;
        res.status(statusCode).json({
            type: "error",
            message,
            error: message,
        });
    }
});

export default adminRouter;
