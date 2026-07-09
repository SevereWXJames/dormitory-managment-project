import mongoose, { Model, Document } from 'mongoose';
import {
    MONGODB_URL_DOCKER,
    MONGODB_URL_LOCAL,
    DATABASE_NAME,
    type CollectionName,
    MONGODB_URL_DEFAULT
} from './databaseConstants.ts';

/**
 * Class that interacts with the MongoDB database.
 */

/**
 * Constructor. Must not be called by external code.
 * To construct a Database object, call create().
 *
 * @param mongoose Mongoose instance obtained from create().
 */

/**
 * Initialization function, returning a promise with a Database object.
 *
 * @param [quiet=false] Set to true to prevent console prints. Defaults to false.
 * @returns A promise, to either be resolved with a Database or be rejected.
 */
export async function connectMongo(quiet: boolean = false): Promise<void> {
    const timeout = 5000;
    const options = {dbName: DATABASE_NAME, serverSelectionTimeoutMS: timeout};

    if (!quiet) {
        console.info("Database.create(): Creating a database connection.");
        console.info(`Database.create(): Note: Each connection attempt may take up to ${timeout / 1000} seconds.`);
    }

    for (const host of [MONGODB_URL_DEFAULT, MONGODB_URL_DOCKER, MONGODB_URL_LOCAL]) {
        if (host == null || host == "") {
            if (!quiet) console.warn("Database.create(): Skipping a host name as it is null or empty.");
            continue;
        }

        try {
            if (!quiet) console.info(`Database.create(): Attempting to connect to ${host}.`);
            await mongoose.connect(host, options);
            clearDB(); //for testing purposes
            if (!quiet) console.info(`Database.create(): Successfully connected to ${host}.`);
            return;
        } catch (e) {
            if (!quiet) console.warn(`Database.create(): Failed to connect to host ${host}.`);
            continue;
        }
    }

    return Promise.reject(new Error("Database.create(): Failed to connect to all specified hosts."));
}

async function clearDB(){
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        if(!collections[key]) continue;
        await collections[key].deleteMany({});
        console.log(`cleared table ${collections[key].collectionName}!`);
    }

}

/**
 * Gets the connection object for the Mongoose instance for this Database.
 * Shorthand for this.mongoose.connection.
 *
 * @returns Connection, the connection of the Database object.
 */
export function getConnection() {
    return mongoose.connection;
}

/**
 * Gets a collection from the database with name collectionName.
 * Shorthand for this.mongoose.connection.collection(collectionName).
 *
 * @params collectionName Name of the collection.
 * @returns Collection, the collection with name collectionName.
 */
export function getCollection(collectionName: CollectionName) {
    // console.debug(`database.getCollection(${collectionName})`);
    return getConnection().collection(collectionName);
}

/**
 * Loads JSON data into the provided collection asychronously.
 * The schema of the provided objects is not validated.
 *
 * @param collectionName Name of the collection.
 * @param data JSON data as an array of JSON objects.
 * @returns A Promise, to either be resolved with void or be rejected.
 */
export async function load(collectionName: CollectionName, data: any[]): Promise<void> {
    // console.debug(`database.load(${collectionName})`);
    const preparedData = data.map((entry) => {
        if (entry != null && typeof entry === "object" && typeof entry._id === "string" && mongoose.Types.ObjectId.isValid(entry._id)) {
            return { ...entry, _id: new mongoose.Types.ObjectId(entry._id) };
        }
        return entry;
    });

    try {
        return getCollection(collectionName).insertMany(preparedData).then(() => {
            Promise.resolve();
        });
    } catch (e) {
        return Promise.reject(e);
    }
}

