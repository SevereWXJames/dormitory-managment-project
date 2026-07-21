import mongoose, {Document, Schema, Types} from "mongoose";
import type {CollectionName} from "../database/databaseConstants.ts";

export interface CreditBalance extends Document{
    _id: Types.ObjectId;
    userId: Types.ObjectId,
    balanceCents: number;
}

const CreditBalanceSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'Users',
        unique: true,
        required: [true, "Please enter a userId"],
    },

    balanceCents: {
        type: Number,
        required: true,
        default: 0,
    }
});

export const CreditBalanceModel = mongoose.model<CreditBalance>("CreditBalances", CreditBalanceSchema, "CreditBalances");

export interface Transaction {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    description: string;
    transaction: number;
}

const transactionSchema = new Schema({userId: mongoose.Types.ObjectId, description: String, transaction: Number});
export const TransactionModel = mongoose.model("Transactions"  as CollectionName, transactionSchema, "Transactions"  as CollectionName);