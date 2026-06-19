import express, {type Request, type Response, type NextFunction} from "express";
import dotenv from "dotenv";
import {json} from "body-parser";
import IoTRouter from "./routes/IoT.ts";
import loginRouter from "./routes/login.ts";
import userRouter from "./routes/user.ts";
import maintenanceRequestRouter from "./routes/maintenance-request.ts";
import creditRouter from "./routes/credits.ts";
import roomsRouter from "./routes/rooms.ts";

dotenv.config();

const app = express();
const port: number = 5000;

app.use(json());

app.use("/rooms", roomsRouter);
app.use("/credits", creditRouter);
app.use("/maintenance-request", maintenanceRequestRouter)
app.use("/IoT", IoTRouter);
app.use("/user", userRouter);
app.use("/", loginRouter);

app.listen(port, () => {
   console.log(`Server running on port ${port}`);
});