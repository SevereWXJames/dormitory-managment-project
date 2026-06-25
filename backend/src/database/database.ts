import { Collection, Db, MongoClient, type Document } from 'mongodb';
import { MONGODB_URL, DATABASE_NAME, type CollectionName } from './databaseConstants.ts';

/**
 * Class that creates Db and Collection objects for the MongoDB database.
 */
export class Database {
	client: MongoClient;
	database: Db;
	facilties: Collection<Document>;
	bookings: Collection<Document>;
	maintenanceRequests: Collection<Document>;
	notices: Collection<Document>;
	credits: Collection<Document>;
	units: Collection<Document>;
	users: Collection<Document>;

	/**
	 * Constructor. Must not be called by external code.
	 * To construct a Database object, call create().
	 * 
	 * @param client MongoClient obtained from create().
	 */
	private constructor (client: MongoClient) {
		this.client = client;
		this.database = this.client.db(DATABASE_NAME);

		this.facilties = this.database.collection("facilities" as CollectionName);
		this.bookings = this.database.collection("bookings" as CollectionName);
		this.maintenanceRequests = this.database.collection("maintenance_requests" as CollectionName);
		this.notices = this.database.collection("notices" as CollectionName);
		this.credits = this.database.collection("credits" as CollectionName);
		this.units = this.database.collection("units" as CollectionName);
		this.users = this.database.collection("users" as CollectionName);
	}

	/**
	 * Initialization function, returning a promise with a Database object.
	 * 
	 * @returns A promise, to either be resolved with a Database or be rejected.
	 */
	public static async create() : Promise<Database> {
		try {
			const client = await MongoClient.connect(MONGODB_URL);
			return Promise.resolve(new Database(client));
		} catch (e) {
			return Promise.reject(`Database: Failed to initialize Database: ${(e as Error).message}`);
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
		try {
			return this.database.collection(collectionName).insertMany(data).then((result) => {
				Promise.resolve();
			});
		} catch (e) {
			return Promise.reject(`Database: Failed to initialize Database: ${(e as Error).message}`);
		}
	}
}

const database = await Database.create();
export default database;