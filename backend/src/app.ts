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
app.use(cors({
    origin: process.env.FRONT_END_URL,
    credentials: true, // required for cookies to be sent/received cross-origin
}));

app.use(json());

app.use("/residents", authenticateRequest, requireRole(Role.ADMIN), residentsRouter);
app.use("/maintenance-request", authenticateRequest, requireRole(Role.ADMIN), maintenanceRequestRouter);
app.use("/notices", authenticateRequest, requireRole(Role.ADMIN), noticeRouter)
app.use("/rooms", authenticateRequest, requireRole(Role.ADMIN), roomsRouter);

app.use("/reservations", authenticateRequest, requireRole(Role.RESIDENT, Role.ADMIN), reservationRouter);
app.use("/services",authenticateRequest, requireRole(Role.RESIDENT, Role.ADMIN), servicesRouter);

app.use("/credits", authenticateRequest, requireRole(Role.RESIDENT), creditRouter);
app.use("/IoT", authenticateRequest, requireRole(Role.RESIDENT, Role.ADMIN), IoTRouter);
app.use("/user",authenticateRequest, requireRole(Role.RESIDENT, Role.ADMIN), userRouter);
app.use("/", authRouter);

export default app;