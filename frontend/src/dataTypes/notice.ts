export class Notice {
    public _id: string;
    public createdBy: string;
    public viewableBy: [string] | null;
    public title: string;
    public text: string;
    public createAt: number;

    constructor({_id, createdBy, viewableBy, title, text, createdAt}: {_id: string, createdBy: string, viewableBy: [string] | null, title: string, text: string, createdAt: number}) {
        this._id = _id;
        this.createdBy = createdBy;
        this.viewableBy = viewableBy;
        this.title = title;
        this.text = text;
        this.createAt = createdAt;
    }
}