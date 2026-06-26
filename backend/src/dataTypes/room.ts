export class Room {
    public id: string;
    public roomName: string;
    public verificationCode: string;

    constructor({id, roomName, verificationCode}: {id: string, roomName: string, verificationCode: string}) {
        this.id = id;
        this.roomName = roomName;
        this.verificationCode = verificationCode;
    }
}