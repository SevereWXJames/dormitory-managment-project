import * as chai from "chai";
import chaiHttp from "chai-http";
import { after, afterEach, before, describe, it } from "mocha";
import {assert} from "chai";
import {clearTestDB, closeTestDB, connectTestDB} from "./setup/setup.ts";
import app from "../../src/app.ts";

const chaiWithHttp = chai.use(chaiHttp);
const { expect } = chai;

describe('POST /signup', () => {
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
        let res;
        try{
            res = await chaiWithHttp.request.execute(app)
                .post('/signup')
                .send({
                    name: 'Alice Dyer',
                    username: 'alice123',
                    email: 'alice@tmp.com',
                    password: 'password123',
                    phoneNUmber: '123456789',
                    roles: ["RESIDENT"]
                });
        }catch(error){
            assert.fail(`Thrown error when should not, error: ${error}`);
        }
        console.log(`response: ${JSON.stringify(res)}`);
        expect(res).to.have.status(200);
    });

});