import mongoose, { Mongoose } from 'mongoose';
import { MONGODB_URL_DOCKER, MONGODB_URL_LOCAL, DATABASE_NAME, type CollectionName } from './databaseConstants.ts';

/**
 * Class that creates ? objects for the MongoDB database.
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
		// console.debug(`Database.create()`);
		try {
			const options = {dbName: DATABASE_NAME};
			const dockerConnectionPromise = mongoose.connect(MONGODB_URL_DOCKER, options);
			const localConnectionPromise = mongoose.connect(MONGODB_URL_LOCAL, options);

			return Promise.any([dockerConnectionPromise, localConnectionPromise]).then(async (mongoose) => {
				console.info(`Database.create(): Connected to ${mongoose.connection.host}`);
				return Promise.resolve(new Database(mongoose));
			});
		} catch (e) {
			console.log(`Database.create(): Connection failed to all hosts.`);
			return Promise.reject(e);
		}
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