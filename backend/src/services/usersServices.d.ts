import type { User } from "../dataTypes/user.ts";
export declare function checkLogIn(username: string, password: string): Promise<boolean>;
export declare function getExistingUserFromUsername(username: string): Promise<User>;
export declare function getExistingUserFromId(_id: string): Promise<User>;
export declare function createToken(_id: string, username: string): string;
//# sourceMappingURL=usersServices.d.ts.map