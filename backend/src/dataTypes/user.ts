export class User {
    public id: string;
    public username: string;
    public email: string;
    public phoneNumber: string;
    public roles: [string];

    constructor({id, username, email, phoneNumber, roles}: {id: string, username: string, email: string, phoneNumber: string, roles: [string]}) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.roles = roles;
    }
}

export class Resident {
    public id: string;
    public userId: string;
    public roomId: string;

    constructor({id, userId, roomId}: {id: string, userId: string, roomId: string}) {
        this.id = id;
        this.userId = userId;
        this.roomId = roomId;
    }
}