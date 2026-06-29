import {} from "mongodb";
export class CreditBalance {
    id;
    userId;
    balanceCents;
    constructor({ id, userId, balanceCents }) {
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
    static fromDocument(document) {
        if (document === null) {
            throw new Error("fromDocument(): Null document");
        }
        try {
            return new CreditBalance({ id: document.id, userId: document.userId, balanceCents: document.balanceCents });
        }
        catch (e) {
            throw new Error(`fromDocument(): ${e.message}`);
        }
    }
}
export class Transaction {
    id;
    userId;
    description;
    transaction;
    constructor({ id, userId, description, transaction }) {
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
    static fromDocument(document) {
        if (document === null) {
            throw new Error("fromDocument(): Null document");
        }
        try {
            return new Transaction({ id: document.id, userId: document.userId, description: document.description,
                transaction: document.transaction });
        }
        catch (e) {
            throw new Error(`fromDocument(): ${e.message}`);
        }
    }
}
//# sourceMappingURL=creditBalance.js.map