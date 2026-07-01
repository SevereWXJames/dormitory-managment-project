import { ObjectId, type Document } from "mongodb";
import { Schema } from "mongoose";
import database from "../database/database.ts";
import type { CollectionName } from "../database/databaseConstants.ts";

export class CreditBalance {
    public _id: string;
    public userId: string;
    public balanceCents: number;
    public static model = database.mongoose.model("credit_balance" as CollectionName, new Schema({_id: String, userId: String, balanceCents: Number}));

    constructor({_id, userId, balanceCents}: {_id: string, userId: string, balanceCents: number}) {
        this._id = _id;
        this.userId = userId;
        this.balanceCents = balanceCents;
    }
}

export class Transaction {
    public _id: string;
    public userId: string;
    public description: string;
    public transaction: number;
    public static model = database.mongoose.model("transactions" as CollectionName, new Schema({_id: String, userId: String, description: String, transaction: Number}));

    constructor({_id, userId, description, transaction}: {_id: string, userId: string, description: string, transaction: number}) {
        this._id = _id;
        this.userId = userId;
        this.description = description;
        this.transaction = transaction;
    }
}