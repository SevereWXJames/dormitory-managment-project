import type {Request} from "express"
import jwt, {verify} from "jsonwebtoken";

export async function verifyRequestHeader(req: Request) {
    //Verify jwt token
    if(!req.headers) throw Error("Invalid request!");
    const cookies = req.headers['set-cookie'] as unknown as string[];

    const token = cookies.find((c) => c.startsWith('jwt='));
    if(!token) throw Error("Invalid Token!");

    const key = process.env.JWT_SECRET;
    if(!key) throw Error("Error authenticating request");

    try {
        // 2. Verify signature + expiration
        const payload = jwt.verify(token, key, {
            algorithms: ['HS256'], // pin the algorithm to avoid alg-confusion attacks
        });
        // 3. Attach to request for downstream use
        req.user = payload;
    } catch (error) {
        throw Error("Error verifying request!", {cause: error});
    }
}