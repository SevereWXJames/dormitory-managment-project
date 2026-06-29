import express, {} from "express";
const IoTRouter = express.Router();
IoTRouter.get("/", async (req, res) => {
    return res.status(501).json({});
});
IoTRouter.get("/get-by-datetime", (req, res) => {
    return res.status(501).json({});
});
export default IoTRouter;
//# sourceMappingURL=IoT.js.map