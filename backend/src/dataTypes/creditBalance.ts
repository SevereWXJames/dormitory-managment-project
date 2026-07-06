import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../database/databaseConstants.ts";

export interface CreditBalance {
    _id: string;
    userId: string;
    balanceCents: number;
}

const creditBalanceSchema = new mongoose.Schema({_id: String, userId: String, balanceCents: Number});
export const CreditBalanceModel = mongoose.model("credit_balance"  as CollectionName, creditBalanceSchema);

export interface Transaction {
    _id: string;
    userId: string;
    description: string;
    transaction: number;
}

const transactionSchema = new Schema({_id: String, userId: String, description: String, transaction: Number});
export const TransactionModel = mongoose.model("transactions"  as CollectionName, transactionSchema);