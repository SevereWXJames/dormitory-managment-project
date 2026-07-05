import { Schema } from "mongoose";
import type { CollectionName } from "../database/databaseConstants.ts";

export class CreditBalance {
    public _id: string;
    public userId: string;
    public balanceCents: number;

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

    constructor({_id, userId, description, transaction}: {_id: string, userId: string, description: string, transaction: number}) {
        this._id = _id;
        this.userId = userId;
        this.description = description;
        this.transaction = transaction;
    }
}