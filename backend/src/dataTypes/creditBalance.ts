import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../database/databaseConstants.ts";

export interface CreditBalance {
    _id: string;
    userId: string;
    balanceCents: number;
}

const creditBalanceSchema = new mongoose.Schema({userId: String, balanceCents: Number});
export const CreditBalanceModel = mongoose.model("CreditBalances"  as CollectionName, creditBalanceSchema, "CreditBalances"  as CollectionName);

export interface Transaction {
    _id: string;
    userId: string;
    description: string;
    transaction: number;
}

const transactionSchema = new Schema({userId: String, description: String, transaction: Number});
export const TransactionModel = mongoose.model("Transactions"  as CollectionName, transactionSchema, "Transactions"  as CollectionName);