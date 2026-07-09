import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../database/databaseConstants.ts";
import {CreditBalances} from "../database/models/creditBalance.model.ts";

export type MongoId = string | mongoose.Types.ObjectId;

export interface CreditBalance {
    _id: MongoId;
    userId: string;
    balanceCents: number;
}

export type CreditBalanceInput = Omit<CreditBalance, "_id"> & { _id?: MongoId };

// const creditBalanceSchema = new mongoose.Schema({userId: String, balanceCents: Number});
// export const CreditBalanceModel = mongoose.model("CreditBalances"  as CollectionName, creditBalanceSchema, "CreditBalances"  as CollectionName);
export const CreditBalanceModel = CreditBalances;

export interface Transaction {
    _id: MongoId;
    userId: string;
    description: string;
    transaction: number;
}

export type TransactionInput = Omit<Transaction, "_id"> & { _id?: MongoId };

const transactionSchema = new Schema({userId: String, description: String, transaction: Number});
export const TransactionModel = mongoose.model("Transactions"  as CollectionName, transactionSchema, "Transactions"  as CollectionName);