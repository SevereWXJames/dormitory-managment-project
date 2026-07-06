import express, {type Request, type Response, type NextFunction} from "express";
import dotenv from "dotenv";
import {json} from "body-parser";
import cors from "cors";
import IoTRouter from "./routes/IoT.ts";
// import loginRouter from "./routes/login.ts";
import userRouter from "./routes/user.ts";
import maintenanceRequestRouter from "./routes/maintenance-request.ts";
import creditRouter from "./routes/credits.ts";
import roomsRouter from "./routes/rooms.ts";
import servicesRouter from "./routes/services.ts";
import noticeRouter from "./routes/notices.ts";
import reservationRouter from "./routes/reservation.ts";
import residentsRouter from "./routes/residents.ts";
import {connectMongo} from "./database/database.ts";
import authRouter from "./routes/signup.js";

dotenv.config();

await connectMongo();

const app = express();
const port: number = 3000;

app.use(json());
app.use(cors());

app.use("/residents", residentsRouter);
app.use("/reservations", reservationRouter);
app.use("/services", servicesRouter);
app.use("/notices", noticeRouter)
app.use("/rooms", roomsRouter);
app.use("/credits", creditRouter);
app.use("/maintenance-request", maintenanceRequestRouter)
app.use("/IoT", IoTRouter);
app.use("/user", userRouter);
app.use("/", authRouter);
// app.use("/", loginRouter);

app.listen(port, () => {
   console.log(`Server running on port ${port}`);
});