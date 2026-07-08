import express from "express";
import {json} from "body-parser";
import cors from "cors";
import IoTRouter from "./routes/IoT.ts";
import userRouter from "./routes/user.ts";
import maintenanceRequestRouter from "./routes/maintenance-request.ts";
import creditRouter from "./routes/credits.ts";
import roomsRouter from "./routes/rooms.ts";
import servicesRouter from "./routes/services.ts";
import noticeRouter from "./routes/notices.ts";
import reservationRouter from "./routes/reservation.ts";
import residentsRouter from "./routes/residents.ts";
import authRouter from "./routes/auth.ts";
import {authenticateRequest, requireRole} from "./middleware/auth.middleware.ts";
import {Role} from "./database/types/user.service.types.ts";

const app = express();
app.use(json());

app.use(cors({
    origin: process.env.FRONT_END_URL,
    credentials: true, // required for cookies to be sent/received cross-origin
}));

app.use("/residents", authenticateRequest, await requireRole(Role.ADMIN), residentsRouter);
app.use("/reservations", authenticateRequest, reservationRouter);
app.use("/services",authenticateRequest, servicesRouter);
app.use("/notices", authenticateRequest, noticeRouter)
app.use("/rooms", authenticateRequest, roomsRouter);
app.use("/credits", authenticateRequest, creditRouter);
app.use("/maintenance-request", authenticateRequest, maintenanceRequestRouter)
app.use("/IoT", authenticateRequest, IoTRouter);
app.use("/user",authenticateRequest, userRouter);
app.use("/", authRouter);

export default app;