import creditBalanceJSON from "../../test_data/creditBalance.json" with {type: "json"};
import transactionHistoryJSON from "../../test_data/transactionHistory.json" with {type: "json"};
import {type CreditBalance, Transaction} from "../dataTypes/creditBalance.ts";

export async function getCreditBalanceByUserId(id: string): Promise<CreditBalance | undefined> {
    const testBalance = creditBalanceJSON.creditBalances.find((creditBalance) => {
        return creditBalance.userId === id;
    });
    return testBalance as CreditBalance;
}

export async function getTransactionHistoryByUserId(id: string): Promise<[Transaction]> {
    return transactionHistoryJSON.transactions.filter((transaction) => {
        return transaction.userId === id;
    }) as [Transaction];
}
