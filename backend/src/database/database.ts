import { Collection, Db, MongoClient, type Document } from 'mongodb';
import { MONGODB_URL, DATABASE_NAME, type CollectionName } from './databaseConstants.ts';

/**
 * Class that creates Db and Collection objects for the MongoDB database.
 */
export class Database {
	client: MongoClient;
	database: Db;

	/**
	 * Constructor. Must not be called by external code.
	 * To construct a Database object, call create().
	 * 
	 * @param client MongoClient obtained from create().
	 */
	private constructor (client: MongoClient) {
		this.client = client;
		this.database = this.client.db(DATABASE_NAME);
	}

	/**
	 * Initialization function, returning a promise with a Database object.
	 * 
	 * @returns A promise, to either be resolved with a Database or be rejected.
	 */
	public static async create() : Promise<Database> {
		// console.debug(`Database.create()`);
		try {
			const client = await MongoClient.connect(MONGODB_URL);
			return Promise.resolve(new Database(client));
		} catch (e) {
			return Promise.reject(e);
		}
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
			return this.database.collection(collectionName).insertMany(data).then((result) => {
				Promise.resolve();
			});
		} catch (e) {
			return Promise.reject(e);
		}
	}
	
	/**
	 * Returns a collection in the SmartAPT database.
	 * Shorthand for database.database.collection(collectionName).
	 * 
	 * @param collectionName Name of the collection.
	 * @returns Corresponding collection.
	 */
	public getCollection(collectionName: CollectionName) : Collection<Document> {
		return this.database.collection(collectionName);
	}
}

const database = await Database.create();
export default database;