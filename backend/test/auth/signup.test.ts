import * as chai from "chai";
import chaiHttp from "chai-http";
import {after, afterEach, before, describe, it } from "node:test";
import {clearTestDB, closeTestDB, connectTestDB} from "./setup/setup.ts";
import app from "../../src/app.ts";

const chaiWithHttp = chai.use(chaiHttp);
const { expect } = chai;

describe('POST /auth/signup', () => {
    before(async () => {
        console.log('file loaded');
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