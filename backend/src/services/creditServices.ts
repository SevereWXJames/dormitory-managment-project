import creditBalanceJSON from "../../test_data/creditBalance.json" with {type: "json"};
import transactionHistoryJSON from "../../test_data/transactionHistory.json" with {type: "json"};
import database from "../database/database.ts";
import {CreditBalance, Transaction} from "../dataTypes/creditBalance.ts";

export async function getCreditBalanceByUserId(userId: string): Promise<CreditBalance | undefined> {
    return CreditBalance.model.findOne({userId: userId}).lean().exec()
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
    const cursor = Transaction.model.find({userId: userId}).lean();
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
