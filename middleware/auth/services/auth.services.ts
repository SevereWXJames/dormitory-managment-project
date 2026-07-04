import { UserRepository } from "../repository/auth.repository.ts"
import { hashPassword, comparePassword, signToken } from "../auth.utils.ts"

// Typed errors so the route layer can map them to the right HTTP status
// without the service needing to know anything about Express.
export class ValidationError extends Error {}
export class ConflictError extends Error {}
export class InvalidCredentialsError extends Error {}

const MIN_PASSWORD_LENGTH = 8;

export class AuthService {
    constructor(private readonly userRepository: UserRepository) {}

    async signup(email: string, password: string): Promise<{ token: string }> {
        if (!email || !password) {
            throw new ValidationError("email and password are required.");
        }
        if (password.length < MIN_PASSWORD_LENGTH) {
            throw new ValidationError(`password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
        }

        const existing = await this.userRepository.findByEmail(email);
        if (existing) {
            throw new ConflictError("An account with that email already exists.");
        }

        const passwordHash = await hashPassword(password);
        const user = await this.userRepository.create({
            email,
            passwordHash,
            createdAt: new Date(),
        });

        const token = signToken({ userId: user._id.toString(), email: user.email });
        return { token };
    }

    async login(email: string, password: string): Promise<{ token: string }> {
        if (!email || !password) {
            throw new ValidationError("email and password are required.");
        }

        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            // Same error as a wrong password below — don't reveal whether the email exists.
            throw new InvalidCredentialsError("Invalid email or password.");
        }

        const passwordMatches = await comparePassword(password, user.passwordHash);
        if (!passwordMatches) {
            throw new InvalidCredentialsError("Invalid email or password.");
        }

        const token = signToken({ userId: user._id.toString(), email: user.email });
        return { token };
    }
}