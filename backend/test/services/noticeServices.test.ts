import * as chai from "chai";
import { getAllNotices, getNoticesForUserId } from "../../src/services/noticeServices.ts";
import loadSampleData from "../../src/database/loadDatabase.ts";

const expect = chai.expect;

describe("noticeServices", function () {
	before(async function() {
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
			const expectedLength = 1;
			const expectedNotice = {
				"_id": "notice2",
				"createdBy": "admin0",
				"viewableBy": ["user1", "user0"],
				"title": "test3",
				"text": "test",
				"createdAt": 2
			};
			const actual = await getNoticesForUserId(userId);
			expect(actual).to.be.instanceOf(Array);
			expect(actual).to.have.lengthOf(expectedLength);
			expect(actual).to.deep.include(expectedNotice);
		});
		it("userId with two viewable notices", async function () {
			const userId = "user0";
			const expectedLength = 2;
			const expectedNotice = {
				"_id": "notice1",
				"createdBy": "admin0",
				"viewableBy": ["user0"],
				"title": "test2",
				"text": "test",
				"createdAt": 1
			};
			const actual = await getNoticesForUserId(userId);
			expect(actual).to.be.instanceOf(Array);
			expect(actual).to.have.lengthOf(expectedLength);
			expect(actual).to.deep.include(expectedNotice);
		});
		it("userId with no viewable notices or absent userId", async function () {
			const userId = "user2";
			const actual = await getNoticesForUserId(userId);
			expect(actual).to.be.instanceOf(Array);
			expect(actual).to.be.empty;
		});
	});
});