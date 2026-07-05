import {CreditBalance, Transaction} from "../dataTypes/creditBalance.ts";
import CreditBalanceModel from "../database/models/creditBalanceModel.ts";
import TransactionModel from "../database/models/transaction.model.ts";

export async function getCreditBalanceByUserId(userId: string): Promise<CreditBalance | undefined> {
    return CreditBalanceModel.findOne({userId: userId}).lean().exec()
        .then((result) => {
            if (result != null) {
                return Promise.resolve(result as CreditBalance);
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
