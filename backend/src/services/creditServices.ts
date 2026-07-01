import creditBalanceJSON from "../../test_data/creditBalance.json" with {type: "json"};
import transactionHistoryJSON from "../../test_data/transactionHistory.json" with {type: "json"};
import database from "../database/database.ts";
import {CreditBalance, Transaction} from "../dataTypes/creditBalance.ts";

export async function getCreditBalanceByUserId(userId: string): Promise<CreditBalance | undefined> {
    // Original, static implementation:
    // const testBalance = creditBalanceJSON.creditBalances.find((creditBalance) => {
    //     return creditBalance.userId === _id;
    // });

    return CreditBalance.model.findOne({userId: userId}).exec()
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
    // Original static implementation:
    // return transactionHistoryJSON.transactions.filter((transaction) => {
    //     return transaction.userId === _id;
    // }) as [Transaction];

    const cursor = Transaction.model.find({userId: userId});
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
