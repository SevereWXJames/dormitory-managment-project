import * as chai from "chai";
import chaiHttp from "chai-http";
import {after, before, describe, it} from "mocha";
import {clearTestDB, closeTestDB, connectTestDB} from "../setup/setup.ts";
import app from "../../src/app.ts";

const chaiWithHttp = chai.use(chaiHttp);
const {expect} = chai;

describe('AUTHENTICATION', () => {
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

    describe('HTTP Response - Sign In', () => {
        let testJwt : string | undefined;
        let testUserId: string | undefined;

        before('Create an account', async () => {
            try{
                const res = await chaiWithHttp.request.execute(app)
                    .post('/signup')
                    .send(validSignupPayload);
            }catch(error){
                throw Error(`Error with signup! ${error}`);
            }
        });

        beforeEach('Log in', async () => {
            try{
                const res = await chaiWithHttp.request.execute(app)
                    .post('/login')
                    .send(validLoginPayload);
                const userId = res.body.data._id;
                const cookies = res.headers['set-cookie'] as unknown as string[];
                const rawCookie = cookies.find((c) => c.startsWith('access='));

                testJwt = rawCookie?.split(';')[0];
                testUserId = userId;
            }catch(error){
                throw Error(`Error with logging in! ${error}`);
            }
        });

        after(async () => {
            await clearTestDB();
        });

        it('accepts request with a valid token', async () => {
            const res = await chaiWithHttp.request.execute(app)
                .get(`/credits/get-for-user/${testUserId}`)
                .set('Cookie', `${testJwt}`)
                .send();
            expect(res).to.have.status(200);
        });

        it('rejects request with an invalid token', async () => {
            const res = await chaiWithHttp.request.execute(app)
                .get(`/credits/get-for-user/${testUserId}`)
                .set('Cookie', `jwt=invalid.token.bad`)
                .send();
            expect(res).to.have.status(500);
            expect(res.body.message).to.equal("Authentication failed");
        });
    })

});