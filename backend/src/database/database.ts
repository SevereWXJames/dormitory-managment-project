import mongoose, { Model, Mongoose } from 'mongoose';
import { MONGODB_URL_DOCKER, MONGODB_URL_LOCAL, DATABASE_NAME, type CollectionName, MONGODB_URL_DEFAULT } from './databaseConstants.ts';

/**
 * Class that interacts with the MongoDB database.
 */
export class Database {
	mongoose: Mongoose;

	/**
	 * Constructor. Must not be called by external code.
	 * To construct a Database object, call create().
	 * 
	 * @param mongoose Mongoose instance obtained from create().
	 */
	private constructor (mongoose: Mongoose) {
		this.mongoose = mongoose;
	}

	/**
	 * Initialization function, returning a promise with a Database object.
	 * 
	 * @returns A promise, to either be resolved with a Database or be rejected.
	 */
	public static async create() : Promise<Database> {
		const timeout = 5000;
		const options = {dbName: DATABASE_NAME, serverSelectionTimeoutMS: timeout};

		console.info("Database.create(): Creating a database connection.");
		console.info(`Database.create(): Note: Each connection attempt may take up to ${timeout/1000} seconds.`);

		for (const host of [MONGODB_URL_DEFAULT, MONGODB_URL_DOCKER, MONGODB_URL_LOCAL]) {
			if (host == null || host == "") {
				console.warn("Database.create(): Skipping a host name as it is null or empty.");
				continue;
			}

			try {
				console.info(`Database.create(): Attempting to connect to ${host}.`);
				await mongoose.connect(host, options);
				console.info(`Database.create(): Successfully connected to ${host}.`);
				return Promise.resolve(new Database(mongoose));
			} catch (e) {
				console.warn(`Database.create(): Failed to connect to host ${host}.`);
				continue;
			}
		}

		return Promise.reject(new Error("Database.create(): Failed to connect to all specified hosts."));
	}

	/**
	 * Gets the connection object for the Mongoose instance for this Database.
	 * Shorthand for this.mongoose.connection.
	 * 
	 * @returns Connection, the connection of the Database object.
	 */
	public getConnection() {
		return this.mongoose.connection;
	}

	/**
	 * Gets a collection from the database with name collectionName.
	 * Shorthand for this.mongoose.connection.collection(collectionName).
	 * 
	 * @params collectionName Name of the collection.
	 * @returns Collection, the collection with name collectionName.
	 */
	public getCollection(collectionName: CollectionName) {
		// console.debug(`database.getCollection(${collectionName})`);
		return this.getConnection().collection(collectionName);
	}

	/**
	 * Loads JSON data into the provided collection asychronously.
	 * The schema of the provided objects is not validated.
	 * 
	 * @param collectionName Name of the collection.
	 * @param data JSON data as an array of JSON objects.
	 * @returns A Promise, to either be resolved with void or be rejected.
	 */
	public async load(collectionName: CollectionName, data: any[]) : Promise<void> {
		// console.debug(`database.load(${collectionName})`);
		try {
			return this.getCollection(collectionName).insertMany(data).then((result) => {
				Promise.resolve();
			});
		} catch (e) {
			return Promise.reject(e);
		}
	}
}

const database = await Database.create();
export default database;