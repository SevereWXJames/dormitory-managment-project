import creditBalanceJSON from "../../test_data/creditBalance.json" with {type: "json"};
import transactionHistoryJSON from "../../test_data/transactionHistory.json" with {type: "json"};
// import database from "../database/database.ts";
import {CreditBalance, Transaction} from "../dataTypes/creditBalance.ts";

export async function getCreditBalanceByUserId(id: string): Promise<CreditBalance | undefined> {
    const testBalance = creditBalanceJSON.creditBalances.find((creditBalance) => {
        return creditBalance.userId === id;
    });

    // This and other updated implementations of the service functions using
    // the database will be added as part of the next related pull request.

    // return database.getCollection("credit_balances").findOne({userId: id})
    //     .then((document) => {
    //         return Promise.resolve(CreditBalance.fromDocument(document));
    //     })
    //     .catch((e) => {
    //         return Promise.reject(e);
    //     });
}

export async function getTransactionHistoryByUserId(id: string): Promise<Transaction[]> {
    return transactionHistoryJSON.transactions.filter((transaction) => {
        return transaction.userId === id;
    }) as [Transaction];

    // This and other updated implementations of the service functions using
    // the database will be added as part of the next related pull request.

    // const cursor = database.getCollection("transactions").find({userId: id});
    // const results: Transaction[] = [];

    // for await (const document of cursor) {
    //     try {
    //         results.push(Transaction.fromDocument(document));
    //     } catch (e) {
    //         return Promise.reject(e);
    //     }
    // }

    // return Promise.resolve(results);
}
