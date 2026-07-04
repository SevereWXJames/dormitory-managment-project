import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type {SignOptions} from "jsonwebtoken";

// Move these to your .env — never hardcode in real code.
const JWT_SECRET = process.env.JWT_SECRET ?? "dev-only-fallback-secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "1h";
const SALT_ROUNDS = 10;

export interface JwtPayload {
    userId: string;
    email: string;
}

export async function hashPassword(plainPassword: string): Promise<string> {
    return bcrypt.hash(plainPassword, SALT_ROUNDS);
}

export async function comparePassword(
    plainPassword: string,
    hashedPassword: string
): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
}

export function signToken(payload: JwtPayload): string {
    return jwt.sign(
        payload,
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN } as SignOptions);
}

export function verifyToken(token: string): JwtPayload {
    // Throws if invalid/expired — let the caller catch it.
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
}