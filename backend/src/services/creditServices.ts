import {
    type CreditBalance,
    CreditBalanceModel,
    type Transaction,
    TransactionModel
} from "../dataTypes/creditBalance.ts";

export async function getCreditBalanceByUserId(userId: string): Promise<CreditBalance | undefined> {
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

export async function getTransactionHistoryByUserId(userId: string): Promise<Transaction[]> {
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

export async function addCredits(userId: string, creditsCents: number): Promise<void> {
    return CreditBalanceModel.findOne({userId: userId}).lean().then(async (result) => {
        if (result == null) {
            return Promise.reject(new Error("userId not found."));
        }
        
        const newBalance = result.balanceCents + creditsCents;
        return Promise.all([
            CreditBalanceModel.updateOne({userId: userId}, {$set: {balanceCents: newBalance}}),
            TransactionModel.insertOne({userId: userId, description: "Added credits", transaction: creditsCents})
        ]).then((result) => {
            Promise.resolve();
        }).catch((error) => {
            Promise.reject(error as Error);
        });
    });
}