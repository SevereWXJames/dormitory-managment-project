import {
    type CreditBalance,
    CreditBalanceModel,
    type Transaction,
    TransactionModel
} from "../dataTypes/creditBalance.ts";
import mongoose from "mongoose";

export async function getCreditBalanceByUserId(userId: mongoose.Types.ObjectId): Promise<CreditBalance | undefined> {
    return CreditBalanceModel.findOne({userId: userId}).lean().exec()
        .then((result) => {
            if (result != null) {
                return Promise.resolve(result as unknown as CreditBalance);
            }
            return Promise.resolve(undefined);
        })
        .catch((e) => {
            return Promise.reject(e);
        });
}

export async function getTransactionHistoryByUserId(userId: mongoose.Types.ObjectId): Promise<Transaction[]> {
    const cursor = TransactionModel.find({userId: userId}).lean();
    const results: Transaction[] = [];

    for await (const result of cursor) {
        try {
            if (result != null) {
                results.push(result as Transaction);
            }
        } catch (e) {
            // "Pass"
        }
    }

    return Promise.resolve(results);
}

export async function addCredits(userId: mongoose.Types.ObjectId, creditsCents: number): Promise<void> {
    const result = await CreditBalanceModel.findOne({userId: userId}).lean();
    if (result == null) {
        throw Error("userId not found");
    }

    const newBalance = result.balanceCents + creditsCents;
    const transactionSession = await mongoose.startSession();
    try {
        await transactionSession.withTransaction(async () => {
            await CreditBalanceModel.updateOne({userId: userId}, {$set: {balanceCents: newBalance}}, {session: transactionSession});
            await TransactionModel.insertOne({
                userId: userId,
                description: "Added credits",
                transaction: creditsCents
            }, {session: transactionSession});
        });
    } catch (error){
        throw Error("Error, failed to add credits", {cause: (error as Error).message});
    }finally{
        await transactionSession.endSession();
    }


}