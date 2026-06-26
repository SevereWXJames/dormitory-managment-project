export class Notice {
    public id: string;
    public createdBy: string;
    public viewableBy: [string] | null;
    public title: string;
    public text: string;
    public createAt: number;

    constructor({id, createdBy, viewableBy, title, text, createdAt}: {id: string, createdBy: string, viewableBy: [string] | null, title: string, text: string, createdAt: number}) {
        this.id = id;
        this.createdBy = createdBy;
        this.viewableBy = viewableBy;
        this.title = title;
        this.text = text;
        this.createAt = createdAt;
    }
}