export declare class User {
    id: string;
    username: string;
    email: string;
    phoneNumber: string;
    roles: [string];
    constructor({ id, username, email, phoneNumber, roles }: {
        id: string;
        username: string;
        email: string;
        phoneNumber: string;
        roles: [string];
    });
}
export declare class Resident {
    id: string;
    userId: string;
    roomId: string;
    constructor({ id, userId, roomId }: {
        id: string;
        userId: string;
        roomId: string;
    });
}
//# sourceMappingURL=user.d.ts.map