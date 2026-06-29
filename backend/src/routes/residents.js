import express, {} from "express";
import { getAllResidents } from "../services/roomServices.ts";
const residentsRouter = express.Router();
residentsRouter.get("/", async (req, res) => {
    try {
        const residents = await getAllResidents();
        return res.status(200).json({ success: true, data: residents });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
});
export default residentsRouter;
//# sourceMappingURL=residents.js.map