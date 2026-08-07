import * as chai from "chai";
import chaiHttp from "chai-http";
import {after, before, describe, it} from "mocha";
import {clearTestDB, closeTestDB, connectTestDB} from "../setup/setup.ts";
import app from "../../src/app.ts";
import {ensureAdminExists} from "../../src/database/loadDatabase.ts";
import {UserModel} from "../../src/dataTypes/user.ts";
import {logIn} from "../../src/services/usersServices.ts";
import {compare} from "bcryptjs";

const chaiWithHttp = chai.use(chaiHttp);
const {expect} = chai;

describe("ADMIN signup authorization", () => {
    before(async () => {
        await connectTestDB();
    });

    after(async () => {
        await clearTestDB();
        await closeTestDB();
    });

    it("rejects admin signup requests without an authenticated admin session", async () => {
        const res = await chaiWithHttp.request.execute(app)
            .post("/signup")
            .send({
                name: "Eve Admin",
                username: "eveadmin",
                email: "eveadmin@example.com",
                password: "secret123",
                phoneNumber: "5550000",
                roles: ["ADMIN"],
            });

        expect(res).to.have.status(401);
        expect(res.body.message).to.equal("Authorization failed.");
    });

    it("creates a fallback admin on startup when no admin exists", async () => {
        await clearTestDB();
        await ensureAdminExists();

        const admins = await UserModel.find({ roles: { $in: ["ADMIN"] } }).lean().exec();
        expect(admins).to.have.length(1);
        expect(admins[0]?.username).to.equal("admin");
        expect(admins[0]?.email).to.equal("admin@smartapt.local");
    });

    it("does not create a fallback admin when sample data is enabled", async () => {
        await clearTestDB();
        process.env.LOAD_SAMPLE_DATA = "true";

        try {
            await import("../../src/database/loadDatabase.ts").then(async ({ default: loadSampleData }) => {
                await loadSampleData();
            });
        } finally {
            delete process.env.LOAD_SAMPLE_DATA;
        }

        const admins = await UserModel.find({ roles: { $in: ["ADMIN"] } }).lean().exec();
        const fallback = admins.find((user) => user.username === "admin" && user.email === "admin@smartapt.local");
        expect(fallback).to.equal(undefined);
    });

    it("assigns a usable password to sample-data admin accounts for login", async () => {
        await clearTestDB();
        delete process.env.SAMPLE_PASSWORD;
        delete process.env.INITIAL_ADMIN_PASSWORD;
        process.env.LOAD_SAMPLE_DATA = "true";

        try {
            await import("../../src/database/loadDatabase.ts").then(async ({ default: loadSampleData }) => {
                await loadSampleData();
            });
        } finally {
            delete process.env.LOAD_SAMPLE_DATA;
        }

        const adminUser = await UserModel.findOne({ username: "admin", email: "admin@smartapt.local" }).lean().exec();
        expect(adminUser).to.not.equal(null);
        expect(adminUser?.password).to.exist;
        expect(await compare("admin", adminUser!.password)).to.equal(true);

        const loggedInUser = await logIn( "admin@smartapt.local", "admin");
        expect(loggedInUser.email).to.equal("admin@smartapt.local");
    });
});
