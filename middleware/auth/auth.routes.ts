import { Router } from "express";
import type {Request, Response} from "express";
import { Db } from "mongodb";
import { UserRepository } from "./repository/auth.repository.ts";
import { AuthService, ValidationError, ConflictError, InvalidCredentialsError } from "./services/auth.services.ts";
import { requireAuth } from "./auth.middleware.ts";

// Thin HTTP layer: parse request, call the service, map the result/error
// to a status code. No hashing, no Mongo queries, no business rules here.
export function createAuthRouter(db: Db): Router {
    const router = Router();
    const authService = new AuthService(new UserRepository(db));

    router.post("/signup", async (req: Request, res: Response) => {
        const { email, password } = req.body ?? {};

        try {
            const { token } = await authService.signup(email, password);
            return res.status(201).json({ token });
        } catch (err) {
            if (err instanceof ValidationError) return res.status(400).json({ error: err.message });
            if (err instanceof ConflictError) return res.status(409).json({ error: err.message });
            console.error(err);
            return res.status(500).json({ error: "Something went wrong." });
        }
    });

    router.post("/login", async (req: Request, res: Response) => {
        const { email, password } = req.body ?? {};

        try {
            const { token } = await authService.login(email, password);
            return res.json({ token });
        } catch (err) {
            if (err instanceof ValidationError) return res.status(400).json({ error: err.message });
            if (err instanceof InvalidCredentialsError) return res.status(401).json({ error: err.message });
            console.error(err);
            return res.status(500).json({ error: "Something went wrong." });
        }
    });

    // Example of a protected route using the middleware.
    router.get("/me", requireAuth, async (req: Request, res: Response) => {
        return res.json({ user: req.user });
    });

    return router;
}