import { Schema } from "mongoose";
import database from "../database/database.ts";
import type { CollectionName } from "../database/databaseConstants.ts";

export class Notice {
    public _id: string;
    public createdBy: string;
    public viewableBy: string[] | null;
    public title: string;
    public text: string;
    public createAt: number;
    public static model = database.mongoose.model("notice" as CollectionName,
        new Schema({_id: String, createdBy: String, viewableBy: Array,
            title: String, text: String, createAt: Number}));

    constructor({_id, createdBy, viewableBy, title, text, createdAt}: {_id: string, createdBy: string, viewableBy: [string] | null, title: string, text: string, createdAt: number}) {
        this._id = _id;
        this.createdBy = createdBy;
        this.viewableBy = viewableBy;
        this.title = title;
        this.text = text;
        this.createAt = createdAt;
    }
}