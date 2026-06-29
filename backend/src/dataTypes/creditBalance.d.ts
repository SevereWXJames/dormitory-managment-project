import { type Document } from "mongodb";
export declare class CreditBalance {
    id: string;
    userId: string;
    balanceCents: number;
    constructor({ id, userId, balanceCents }: {
        id: string;
        userId: string;
        balanceCents: number;
    });
    /**
     * Converts a MongoDB document into a CreditBalance object if possible.
     *
     * @param document MongoDB document.
     * @returns The equivalent CreditBalance object.
     * @throws Error if the document cannot be converted.
     */
    static fromDocument(document: Document | null): CreditBalance;
}
export declare class Transaction {
    id: string;
    userId: string;
    description: string;
    transaction: number;
    constructor({ id, userId, description, transaction }: {
        id: string;
        userId: string;
        description: string;
        transaction: number;
    });
    /**
     * Converts a MongoDB document into a Transaction object if possible.
     *
     * @param document MongoDB document.
     * @returns The equivalent Transaction object.
     * @throws Error if the document cannot be converted.
     */
    static fromDocument(document: Document | null): Transaction;
}
//# sourceMappingURL=creditBalance.d.ts.map