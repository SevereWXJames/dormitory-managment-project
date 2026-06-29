import { type Document } from "mongodb";

export class CreditBalance {
    public id: string;
    public userId: string;
    public balanceCents: number;

    constructor({id, userId, balanceCents}: {id: string, userId: string, balanceCents: number}) {
        this.id = id;
        this.userId = userId;
        this.balanceCents = balanceCents;
    }

    /**
     * Converts a MongoDB document into a CreditBalance object if possible.
     * 
     * @param document MongoDB document.
     * @returns The equivalent CreditBalance object.
     * @throws Error if the document cannot be converted.
     */
    public static fromDocument(document: Document | null) : CreditBalance {
        if (document === null) {
            throw new Error("fromDocument(): Null document");
        }

        try {
            return new CreditBalance({id: document.id, userId: document.userId, balanceCents: document.balanceCents});
        } catch (e) {
            throw new Error(`fromDocument(): ${(e as Error).message}`);
        }
    }
}

export class Transaction {
    public id: string;
    public userId: string;
    public description: string;
    public transaction: number;

    constructor({id, userId, description, transaction}: {id: string, userId: string, description: string, transaction: number}) {
        this.id = id;
        this.userId = userId;
        this.description = description;
        this.transaction = transaction;
    }

    /**
     * Converts a MongoDB document into a Transaction object if possible.
     * 
     * @param document MongoDB document.
     * @returns The equivalent Transaction object.
     * @throws Error if the document cannot be converted.
     */
    public static fromDocument(document: Document | null) : Transaction {
        if (document === null) {
            throw new Error("fromDocument(): Null document");
        }

        try {
            return new Transaction({id: document.id, userId: document.userId, description: document.description,
                transaction: document.transaction});
        } catch (e) {
            throw new Error(`fromDocument(): ${(e as Error).message}`);
        }
    }
}