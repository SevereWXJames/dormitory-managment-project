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
