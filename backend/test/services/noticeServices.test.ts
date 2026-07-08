import * as chai from "chai";
import { getAllNotices, getNoticesForUserId } from "../../src/services/noticeServices.ts";
import loadSampleData from "../../src/database/loadDatabase.ts";
import {connectMongo} from "../../src/database/database.ts";

const expect = chai.expect;

describe("noticeServices", function () {
	before(async function() {
		this.timeout(15000);
		await connectMongo(true);
		await loadSampleData();
	});

	describe("getAllNotices()", function () {
		it("Test", async function () {
			const expectedLength = 3;
			const actual = await getAllNotices();
			expect(actual).to.be.instanceOf(Array);
			expect(actual).to.have.lengthOf(expectedLength);
		})
	});

	describe("getNoticesForUserId", function () {
		it("userId with one viewable notice", async function () {
			const userId = "user1";
			const actual = await getNoticesForUserId(userId);
			expect(actual).to.be.instanceOf(Array);
			expect(actual).to.have.lengthOf(1);
			expect(actual.some((notice) => notice.title === "test3" && notice.text === "test" && Array.isArray(notice.viewableBy) && notice.viewableBy.includes("user1"))).to.be.true;
		});
		it("userId with two viewable notices", async function () {
			const userId = "user0";
			const actual = await getNoticesForUserId(userId);
			expect(actual).to.be.instanceOf(Array);
			expect(actual).to.have.lengthOf(2);
			expect(actual.some((notice) => notice.title === "test2" && notice.text === "test" && Array.isArray(notice.viewableBy) && notice.viewableBy.includes("user0"))).to.be.true;
		});
		it("userId with no viewable notices or absent userId", async function () {
			const userId = "user2";
			const actual = await getNoticesForUserId(userId);
			expect(actual).to.be.instanceOf(Array);
			expect(actual).to.be.empty;
		});
	});
});