import { Collection, Db, MongoClient, type Document } from 'mongodb';
import { type CollectionName } from './databaseConstants.ts';
/**
 * Class that creates Db and Collection objects for the MongoDB database.
 */
export declare class Database {
    client: MongoClient;
    database: Db;
    /**
     * Constructor. Must not be called by external code.
     * To construct a Database object, call create().
     *
     * @param client MongoClient obtained from create().
     */
    private constructor();
    /**
     * Initialization function, returning a promise with a Database object.
     *
     * @returns A promise, to either be resolved with a Database or be rejected.
     */
    static create(): Promise<Database>;
    /**
     * Loads JSON data into the provided collection asychronously.
     * The schema of the provided objects is not validated.
     *
     * @param collectionName Name of the collection.
     * @param data JSON data as an array of JSON objects.
     * @returns A Promise, to either be resolved with void or be rejected.
     */
    load(collectionName: CollectionName, data: any[]): Promise<void>;
    /**
     * Returns a collection in the SmartAPT database.
     * Shorthand for database.database.collection(collectionName).
     *
     * @param collectionName Name of the collection.
     * @returns Corresponding collection.
     */
    getCollection(collectionName: CollectionName): Collection<Document>;
}
declare const database: Database;
export default database;
//# sourceMappingURL=database.d.ts.map