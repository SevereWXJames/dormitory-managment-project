export class User {
    public _id: string;
    public username: string;
    public email: string;
    public phoneNumber: string;
    public roles: string[];

    constructor({_id, username, email, phoneNumber, roles}: {_id: string, username: string, email: string, phoneNumber: string, roles: string[]}) {
        this._id = _id;
        this.username = username;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.roles = roles;
    }
}

export class Resident {
    public _id: string;
    public userId: string;
    public roomId: string;

    constructor({_id, userId, roomId}: {_id: string, userId: string, roomId: string}) {
        this._id = _id;
        this.userId = userId;
        this.roomId = roomId;
    }
}