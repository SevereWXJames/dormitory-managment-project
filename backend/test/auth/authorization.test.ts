import * as chai from "chai";
import chaiHttp from "chai-http";
import {after, before, describe, it} from "mocha";
import {clearTestDB, closeTestDB, connectTestDB} from "../setup/setup.ts";
import app from "../../src/app.ts";

const chaiWithHttp = chai.use(chaiHttp);
const {expect} = chai;

describe('AUTHORIZATION', () => {
    before(async () => {
        console.log('file loaded');
        await connectTestDB();
    });

    after(async () => {
        await closeTestDB();
    });

    const residentSignupPayload = {
        name: 'Alice Dyer',
        username: 'alice123',
        email: 'alice@tmp.com',
        password: 'password123',
        phoneNUmber: '123456789',
        roles: ["RESIDENT"],
    };

    const residentLoginPayload = {
        username: 'alice123',
        email: 'alice@tmp.com',
        password: 'password123',
    };

    const adminSignUpPayload = {
        name: 'Gertrude Robinson',
        username: 'grbookworm123',
        email: 'grbookworm@tma.com',
        password: 'plastic_explosives_798',
        phoneNUmber: '456893234',
        roles: ["ADMIN"],
    };

    const adminLoginPayload = {
        username: 'grbookworm123',
        email: 'grbookworm@tma.com',
        password: 'plastic_explosives_798',
    };

    describe('HTTP Response - Valid Role', () => {
        let testJwt : string | undefined;
        let testUserId: string | undefined;

        before('Create an ADMIN account', async () => {
            try{
                await chaiWithHttp.request.execute(app)
                    .post('/signup')
                    .send(adminSignUpPayload);
            }catch(error){
                throw Error(`Error with signup! ${error}`);
            }
        });

        beforeEach('Log in with an admin account', async () => {
            try{
                const res = await chaiWithHttp.request.execute(app)
                    .post('/login')
                    .send(adminLoginPayload);
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

        it('accepts request with a valid token and role', async () => {
            const res = await chaiWithHttp.request.execute(app)
                .get(`/residents`)
                .set('Cookie', `${testJwt}`)
                .send();
            console.log(`res: ${JSON.stringify(res, null, 2)}`);
            expect(res).to.have.status(200);

        });

        it('rejects request with an invalid token and valid role', async () => {
            const res = await chaiWithHttp.request.execute(app)
                .get(`/residents`)
                .set('Cookie', `112938123.fake.jwt`)
                .send();
            console.log(`res: ${JSON.stringify(res, null, 2)}`);
            expect(res).to.have.status(500);
            expect(res.body.message).to.equal("Authentication failed");
            expect(res.body.type).to.equal("error")
        });

    })

    describe('HTTP Response - Invalid Role', () => {
        let testJwt : string | undefined;
        let testUserId: string | undefined;

        before('Create a RESIDENT account', async () => {
            try{
                await chaiWithHttp.request.execute(app)
                    .post('/signup')
                    .send(residentSignupPayload);
            }catch(error){
                throw Error(`Error with signup! ${error}`);
            }
        });

        beforeEach('Log in with a resident account', async () => {
            try{
                const res = await chaiWithHttp.request.execute(app)
                    .post('/login')
                    .send(residentLoginPayload);
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

        it('rejects request with a valid token but invalid role', async () => {
            const res = await chaiWithHttp.request.execute(app)
                .get(`/residents`)
                .set('Cookie', `${testJwt}`)
                .send();
            expect(res).to.have.status(403);
            expect(res?.body.message).to.equal("Authorization failed.");
        });
    });

});