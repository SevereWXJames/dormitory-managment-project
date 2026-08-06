import express from "express";
import cookieParser from "cookie-parser";
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
import {authenticateRequest, checkRefreshToken, requireRole} from "./middleware/auth.middleware.ts";
import {Role} from "./database/types/user.service.types.ts";
import dotenv from "dotenv";
import helmet from "helmet";

dotenv.config({ path: '../.env' });

const app = express();
app.use(helmet({
    contentSecurityPolicy:{
        directives:{
            "script-src":["'self'"],
            "default-src":["'self'"],
            "img-src":["'self'"],
            "frame-ancestors":["'none'"],
            "form-action": ["'self'"]
        }
    },
    xContentTypeOptions: true
}));

app.use(cors({
    origin: process.env.FRONT_END_URL ?? "http://localhost:5173",
    credentials: true, // required for cookies to be sent/received cross-origin
}));
app.use(json());
app.use(cookieParser());
app.use(express.json());

app.use("/residents", authenticateRequest, requireRole(Role.ADMIN), residentsRouter);
app.use("/notices", authenticateRequest, requireRole(Role.ADMIN, Role.RESIDENT), noticeRouter)
app.use("/rooms", authenticateRequest, requireRole(Role.ADMIN), roomsRouter);

app.use("/maintenance-request", authenticateRequest, requireRole(Role.ADMIN, Role.RESIDENT), maintenanceRequestRouter);
app.use("/reservations", authenticateRequest, requireRole(Role.RESIDENT, Role.ADMIN), reservationRouter);
app.use("/services",authenticateRequest, requireRole(Role.RESIDENT, Role.ADMIN), servicesRouter);

app.use("/credits", authenticateRequest, requireRole(Role.RESIDENT), creditRouter);
app.use("/IoT", authenticateRequest, requireRole(Role.RESIDENT, Role.ADMIN), IoTRouter);
app.use("/user",authenticateRequest, requireRole(Role.RESIDENT, Role.ADMIN), userRouter);
app.use("/refresh", checkRefreshToken, authRouter);
app.use("/", authRouter);

export default app;