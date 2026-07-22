import * as chai from "chai";
import chaiHttp from "chai-http";
import {after, afterEach, before, describe, it} from "mocha";
import {clearTestDB, closeTestDB, connectTestDB} from "../setup/setup.ts";
import app from "../../src/app.ts";
import {RefreshTokenModel} from "../../src/dataTypes/refreshTokens.ts";
const chaiWithHttp = chai.use(chaiHttp);
const {expect} = chai;

/* NOTE: To run the tests in intelliJ and see them pass, follow these steps:
* 1. Go to 'Run' -> 'Edit Configurations'. Ensure that test 'POST/logout' is selected.
* 2. In 'environment variables' field, input 'NODE_ENV=test'
* 3. Apply the changes
* 4. Click OK */

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
        let testRefreshToken : string | undefined;
        let testUserId: string | undefined;
        let agent: ChaiHttp.Agent; // persists cookies across requests

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
                agent = chaiWithHttp.request.agent(app); // fresh agent per test, cookie jar attached to it

                const res = await agent.post('/login')
                    .send(validLoginPayload);

                const userId = res.body.data._id;
                const cookies = res.headers['set-cookie'] as unknown as string[];
                const rawCookie = cookies.find((c) => c.startsWith('refresh='));

                testRefreshToken = rawCookie?.split(';')[0];
                testUserId = userId;
            } catch (error) {
                throw Error(`Error with logging in! ${error}`);
            }
        });

        afterEach( async () => {
            agent.close(); //Clears agent's cookies between tests
        })

        after(async () => {

            await clearTestDB();
        });

        it('logs out successfully', async () => {
            try {
                const res = await agent.post('/logout')
                    .send();
                console.log(`res: ${JSON.stringify(res.body)}`);
                expect(res.body.type).to.equal("success");
            } catch (error) {
                throw Error(`Error with logging out! ${error}`);
            }
        });

        it('clears access and refresh tokens upon successful logout', async () => {
            try {
                const res = await agent
                    .post('/logout')
                    .send();
                const cookies = res.headers['set-cookie'] as unknown as string[];
                const rawAccessCookie = cookies.find((c) => c.startsWith('access='));
                const rawRefreshCookie = cookies.find((c) => c.startsWith('refresh='));

                const accessToken = rawAccessCookie?.split(';')[0]?.replace("access=", "");
                const refreshToken = rawRefreshCookie?.split(';')[0]?.replace("refresh=", "");

                expect(accessToken?.length).lessThanOrEqual(0);
                expect(refreshToken?.length).lessThanOrEqual(0);

            }catch (error){
                throw Error(`Error with loggin out! ${error}`);
            }
        })

        it('deletes refresh and access token upon successful logout', async () => {
            try {
                await agent
                    .post('/logout')
                    .send();
                const id = testUserId ? testUserId : null;
                const token = testRefreshToken ? testRefreshToken : null;
                const filter = {userId: id, refreshToken: token}

                const docs = await RefreshTokenModel.find(filter).exec();
                expect(docs.length <= 0).to.be.true;
            }catch(error){
                throw Error(`Error with logging out! ${error}`);
            }
        })

    });
});