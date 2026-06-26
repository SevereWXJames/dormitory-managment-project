import creditBalanceJSON from "../../test_data/creditBalance.json" with {type: "json"};
import transactionHistoryJSON from "../../test_data/transactionHistory.json" with {type: "json"};
import database from "../database/database.ts";
import {CreditBalance, Transaction} from "../dataTypes/creditBalance.ts";

export async function getCreditBalanceByUserId(id: string): Promise<CreditBalance | undefined> {
    // const testBalance = creditBalanceJSON.creditBalances.find((creditBalance) => {
    //     return creditBalance.userId === id;
    // });

    return database.getCollection("credit_balances").findOne({id: id})
        .then((document) => {
            return Promise.resolve(CreditBalance.fromDocument(document));
        })
        .catch((e) => {
            return Promise.reject((e as Error).message);
        });
}

export async function getTransactionHistoryByUserId(id: string): Promise<Transaction[]> {
    // return transactionHistoryJSON.transactions.filter((transaction) => {
    //     return transaction.userId === id;
    // }) as [Transaction];

    const cursor = database.getCollection("transactions").find({id: id});
    const results: Transaction[] = [];

    for await (const document of cursor) {
        try {
            results.push(Transaction.fromDocument(document));
        } catch (e) {
            return Promise.reject((e as Error).message);
        }
    }

    return Promise.resolve(results);
}
