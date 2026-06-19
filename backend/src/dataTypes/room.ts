export class Room {
    public _id: string;
    public roomName: string;
    public verificationCode: string;

    constructor({_id, roomName, verificationCode}: {_id: string, roomName: string, verificationCode: string}) {
        this._id = _id;
        this.roomName = roomName;
        this.verificationCode = verificationCode;
    }
}