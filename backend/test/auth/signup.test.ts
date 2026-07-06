import * as chai from "chai";
import chaiHttp from "chai-http";
import {after, afterEach, before, describe, it } from "node:test";
import {expressApp} from "../../src/server.ts";
import {clearTestDB, closeTestDB, connectTestDB} from "./setup/setup.ts";

const chaiWithHttp = chai.use(chaiHttp);
const { expect } = chai;
const app = expressApp;

describe('POST /auth/signup', () => {
    before(async () => {
        await connectTestDB();
    });

    after(async () => {
        await closeTestDB();
    });

    afterEach(async () => {
        await clearTestDB();
    });


    it('should create a new resident and return a token', async () => {
        const res = await chaiWithHttp.request.execute(app)
            .post('/auth/signup')
            .send({
                name: 'Alice Dyer',
                username: 'alice@gmail.com',
                email: 'alice@example.com',
                password: 'password123',
                phoneNUmber: '123456789',
                role: ["RESIDENT"]
            });

        expect(res).to.have.status(200);
    });

});