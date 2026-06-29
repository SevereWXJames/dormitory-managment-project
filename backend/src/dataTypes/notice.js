export class Notice {
    id;
    createdBy;
    viewableBy;
    title;
    text;
    createAt;
    constructor({ id, createdBy, viewableBy, title, text, createdAt }) {
        this.id = id;
        this.createdBy = createdBy;
        this.viewableBy = viewableBy;
        this.title = title;
        this.text = text;
        this.createAt = createdAt;
    }
}
//# sourceMappingURL=notice.js.map