import * as chai from "chai";
// import chaiAsPromised from 'chai-as-promised';
import { getExistingUserFromUsername, getExistingUserFromId, getExistingUserFromEmail } from "../../src/services/usersServices.ts";
import loadSampleData from "../../src/database/loadDatabase.ts";
import {connectMongo} from "../../src/database/database.ts";
import {UserModel} from "../../src/dataTypes/user.ts";
import mongoose from "mongoose";

// chai.use(chaiAsPromised);

const expect = chai.expect;

describe("usersServices", function () {
	before(async function() {
        try{
            this.timeout(15000);
            await connectMongo();
            await loadSampleData();
        }catch(error){
            throw Error(`Error with setup! ${error}`);
        }
	});

	describe("getExistingUserFromUsername()", function () {
        it('should find all docs', async () => {
            console.log('Querying DB:', UserModel.db.name);
            console.log('UserModel is querying collection:', UserModel.collection.collectionName);
            const all = await UserModel.find({});
            const ids = all.map(doc => doc._id);
            console.log(`ids: ${ids}`);
            console.log('first:', all[0]);
            console.log('all docs:', all);
        });

		it("Existing username", async function () {
            const username = "test1";
			const expectedUser = {
				_id: "507f191e810c19729de860ea",
				name: "Test Resident Name 1",
				username: "test1",
				email: "test1@test.com",
				phoneNumber: "6045550001",
				roles: ["RESIDENT"]
			};
			const actual = await getExistingUserFromUsername(username);
			expect(actual).to.not.be.undefined;
			let cleanUser = actual as any;
			cleanUser._id = cleanUser._id.toString();
			console.log(JSON.stringify(cleanUser));
			expect(cleanUser).to.deep.include(expectedUser);
		});
		it("Absent username", async function () {
			const username = "not_a_username";
			const actual = await getExistingUserFromUsername(username);
			expect(actual).to.be.undefined;
		});
	});

	describe("getExistingUserFromEmail()", function () {
		it("Existing e-mail", async function () {
			const email = "test1@test.com";
			const expectedUser = {
				_id: "507f191e810c19729de860ea",
				name: "Test Resident Name 1",
				username: "test1",
				email: "test1@test.com",
				phoneNumber: "6045550001",
				roles: ["RESIDENT"]
			};
			const actual = await getExistingUserFromEmail(email);
			expect(actual).to.not.be.undefined;
			let cleanUser = actual as any;
			cleanUser._id = cleanUser._id.toString();
			console.log(JSON.stringify(cleanUser));
			expect(cleanUser).to.deep.include(expectedUser);
		});
		it("Absent e-mail", async function () {
			const email = "not_an_email";
			const actual = await getExistingUserFromEmail(email);
			expect(actual).to.be.undefined; 
		});
	});

	describe("getExistingUserFromId()", function () {
		it("Existing id", async function () {
			const id = new mongoose.Types.ObjectId("507f191e810c19729de860eb");
			const expectedUser = {
				_id: "507f191e810c19729de860eb",
				name: "Test Resident Name 2",
				username: "test2",
				email: "test2@test.com",
				phoneNumber: "6045550002",
				roles: ["RESIDENT"]
			};
			const actual = await getExistingUserFromId(id);
			expect(actual).to.not.be.undefined;
			let cleanUser = actual as any;
			cleanUser._id = cleanUser._id.toString();
			console.log(JSON.stringify(cleanUser));
			expect(cleanUser).to.deep.include(expectedUser);
		});
		it("Absent id", async function () {
			const id = new mongoose.Types.ObjectId("000f191e810c19729de860eb");
			const actual = await getExistingUserFromId(id);
			expect(actual).to.be.undefined;
		});
	});
});