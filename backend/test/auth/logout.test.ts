import * as chai from "chai";
import chaiHttp from "chai-http";
import {after, afterEach, before, describe, it} from "mocha";
import {clearTestDB, closeTestDB, connectTestDB} from "../setup/setup.ts";
import app from "../../src/app.ts";
const chaiWithHttp = chai.use(chaiHttp);
const {expect} = chai;

describe('POST /logout', () => {
    before(async () => {
        console.log('file loaded');
        await connectTestDB();
    });

    after(async () => {
        await closeTestDB();
    });

    const validSignupPayload = {
        name: 'Alice Dyer',
        username: 'alice123',
        email: 'alice@tmp.com',
        password: 'password123',
        phoneNUmber: '123456789',
        roles: ["RESIDENT"],
    };

    const validLoginPayload = {
        username: 'alice123',
        email: 'alice@tmp.com',
        password: 'password123',
    };

    describe('HTTP Response - Log In', () => {
        before('Create an account', async () => {
            try {
                await chaiWithHttp.request.execute(app)
                    .post('/signup')
                    .send(validSignupPayload);
            } catch (error) {
                throw Error(`Error with setup! ${error}`);
            }
        });

        beforeEach('Log in', async () => {
            try {
                await chaiWithHttp.request.execute(app)
                    .post('/login')
                    .send(validLoginPayload);
            } catch (error) {
                throw Error(`Error with logging in! ${error}`);
            }
        });

        after(async () => {
            await clearTestDB();
        });

        it('logs out successfully', async () => {
            try {
                const res = await chaiWithHttp.request.execute(app)
                    .post('/logout')
                    .send();
                expect(res.body.type).to.equal("success");
                const cookies = res.headers['set-cookie'] as unknown as string[];
                const rawCookie = cookies.find((c) => c.startsWith('jwt='));
                const jwt = rawCookie?.split(';')[0]?.replace("jwt=", "");
                expect(jwt?.length).lessThanOrEqual(0);
            } catch (error) {
                throw Error(`Error with logging out! ${error}`);
            }
        })

    });
});