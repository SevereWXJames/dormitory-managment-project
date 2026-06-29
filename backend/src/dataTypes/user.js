export class User {
    id;
    username;
    email;
    phoneNumber;
    roles;
    constructor({ id, username, email, phoneNumber, roles }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.roles = roles;
    }
}
export class Resident {
    id;
    userId;
    roomId;
    constructor({ id, userId, roomId }) {
        this.id = id;
        this.userId = userId;
        this.roomId = roomId;
    }
}
//# sourceMappingURL=user.js.map