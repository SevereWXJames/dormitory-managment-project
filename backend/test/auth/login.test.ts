import * as chai from "chai";
import {after, afterEach, before, describe, it} from "mocha";
import {clearTestDB, closeTestDB, connectTestDB} from "./setup/setup.ts";
import app from "../../src/app.ts";
import {Users} from "../../src/database/models/users.model.ts";
import chaiHttp from "chai-http";

const chaiWithHttp = chai.use(chaiHttp);
const {expect} = chai;

describe('POST /login', () => {
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

    const invalidPasswordPayload = {
        username: 'alice123',
        email: 'alice@tmp.com',
        password: 'password1234',
    };

    const invalidUsernamePayload = {
        username: 'alice1234',
        email: 'alice@tmp.com',
        password: 'password123',
    };

    const invalidEmailPayload = {
        username: 'alice1234',
        email: 'aliceye@tmp.com',
        password: 'password123',
    };

    const validLoginPayload = {
        username: 'alice123',
        email: 'alice@tmp.com',
        password: 'password123',
    };

    describe('HTTP Response - Log In', () => {
        beforeEach('Create an account', async () => {
            try{
                await chaiWithHttp.request.execute(app)
                    .post('/signup')
                    .send(validSignupPayload);
            }catch(error){
                throw Error(`Error with setup! ${error}`);
            }
        });

        afterEach(async () => {
            await clearTestDB();
        });

        it('should return 200 on successful login', async () => {
            const res = await chaiWithHttp.request.execute(app)
                .post('/login')
                .send(validLoginPayload);
            console.log(`res: ${JSON.stringify(res.body)}`);
            expect(res).to.have.status(200);
        });

        it('should return 500 on invalid password', async () => {
            const res = await chaiWithHttp.request.execute(app)
                .post('/login')
                .send(invalidPasswordPayload);
            console.log(`res: ${JSON.stringify(res.body)}`);
            expect(res).to.have.status(500);
        });

        it('should return 500 on invalid username', async () => {
            const res = await chaiWithHttp.request.execute(app)
                .post('/login')
                .send(invalidUsernamePayload);
            console.log(`res: ${JSON.stringify(res.body)}`);
            expect(res).to.have.status(500);
        });

        it('should return 500 on invalid email', async () => {
            const res = await chaiWithHttp.request.execute(app)
                .post('/login')
                .send(invalidEmailPayload);
            console.log(`res: ${JSON.stringify(res.body)}`);
            expect(res).to.have.status(500);
        });


        it('should set a jwt cookie on a successful login', async () => {
            const res = await chaiWithHttp.request.execute(app)
                .post('/login')
                .send(validLoginPayload);
            expect(res.headers['set-cookie']).to.exist;
        });

        it('should set the jwt cookie with the correct flags', async () => {
            const res = await chaiWithHttp.request.execute(app)
                .post('/login')
                .send(validLoginPayload);

            const cookies = res.headers['set-cookie'] as unknown as string[];
            const jwtCookie = cookies.find((c) => c.startsWith('jwt='));
            expect(jwtCookie).to.exist;
            expect(jwtCookie).to.include('HttpOnly');
            expect(jwtCookie).to.include('Secure');
            expect(jwtCookie).to.include('SameSite=Strict');
        });

        it('should have the expected response fields on success', async () => {
            const res = await chaiWithHttp.request.execute(app)
                .post('/login')
                .send(validLoginPayload);
            const data = res.body.data;
            expect(data?._id).to.exist;
            expect(data?.username).to.exist;
            expect(data?.email).to.exist;
            expect(data?.roles).to.exist;
        });

        it('should have the expected userid on success', async () => {
            const res = await chaiWithHttp.request.execute(app)
                .post('/login')
                .send(validLoginPayload);
            const data = res.body.data;
            const userId = data._id;

            const doc = await Users.findOne({email: 'alice@tmp.com'}).exec();
            const expectedId = doc!._id!.toString();
            expect(userId).to.equal(expectedId);
        });

        it('should have the expected field values on success', async () => {
            const res = await chaiWithHttp.request.execute(app)
                .post('/login')
                .send(validLoginPayload);
            const data = res.body.data;
            expect(data?.username).to.equal('alice123');
            expect(data?.email).to.equal('alice@tmp.com');
            expect(data?.roles.length > 0);
            expect(data?.roles[0] == "RESIDENT");
        });
    })

});