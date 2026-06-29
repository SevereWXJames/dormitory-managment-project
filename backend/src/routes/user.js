import express, {} from "express";
import { getExistingUserFromId } from "../services/usersServices.ts";
const userRouter = express.Router();
userRouter.get("/get-by-id/:userId", async (req, res) => {
    if (req.params.userId === undefined) {
        return res.status(400).json({ success: false, message: "No ID provided." });
    }
    try {
        const user = await getExistingUserFromId(req.params.userId);
        if (user === undefined) {
            return res.status(400).json({ success: false, message: "Provided ID matches no user." });
        }
        return res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
});
export default userRouter;
//# sourceMappingURL=user.js.map