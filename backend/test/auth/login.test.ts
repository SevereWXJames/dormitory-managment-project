import * as chai from "chai";
import chaiHttp from "chai-http";
import {after, afterEach, before, describe, it} from "mocha";
import {clearTestDB, closeTestDB, connectTestDB} from "../setup/setup.ts";
import app from "../../src/app.ts";
import {UserModel} from "../../src/dataTypes/user.ts";
import {RefreshTokenModel} from "../../src/dataTypes/refreshTokens.ts";
import {extractUserPayloadFromRefreshToken} from "../../src/utility/auth-utils/tokens.ts";

const chaiWithHttp = chai.use(chaiHttp);
const {expect} = chai;
const Users = UserModel;

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

    const missingEmailPayload = {
        username: 'alice123',
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

        it('should have both refresh and access token on successful login', async() => {
            const res = await chaiWithHttp.request.execute(app)
                .post('/login')
                .send(validLoginPayload);
            expect(res).to.have.status(200);

            const cookies = res.headers['set-cookie'] as unknown as string[];
            console.log(`res-headers: ${JSON.stringify(res.headers)}`)
            console.log(`cookies: ${cookies}`);
            const rawAccessCookie = cookies.find((c) => c.startsWith('access='));
            const rawRefreshCookie = cookies.find((c) => c.startsWith('refresh='));

            const accessToken = rawAccessCookie?.split(';')[0];
            const refreshToken  = rawRefreshCookie?.split(';')[0];

            expect(refreshToken).to.exist;
            expect(accessToken).to.exist;
        });

        it('should insert the refresh token on successful login', async () => {
            const res = await chaiWithHttp.request.execute(app)
                .post('/login')
                .send(validLoginPayload);
            expect(res).to.have.status(200);

            const cookies = res.headers['set-cookie'] as unknown as string[];
            console.log(`res-headers: ${JSON.stringify(res.headers)}`)
            console.log(`cookies: ${cookies}`);
            const rawCookie = cookies.find((c) => c.startsWith('refresh='));
            const token  = rawCookie?.split(';')[0];
            const refreshToken = (token as string).replace("refresh=", "");

            const {id} = extractUserPayloadFromRefreshToken(refreshToken);
            const userId = id as string;
            const filter = {userId: userId, refreshToken: refreshToken}
            const docs = await RefreshTokenModel.find(filter).exec();
            expect(docs.length > 0).to.be.true;
        });

        it('should return 500 on invalid password', async () => {
            const res = await chaiWithHttp.request.execute(app)
                .post('/login')
                .send(invalidPasswordPayload);
            console.log(`res: ${JSON.stringify(res.body)}`);
            expect(res).to.have.status(400);
        });

        it('should return 500 on invalid username', async () => {
            const res = await chaiWithHttp.request.execute(app)
                .post('/login')
                .send(invalidUsernamePayload);
            console.log(`res: ${JSON.stringify(res.body)}`);
            expect(res).to.have.status(400);
        });

        it('should return 500 on invalid email', async () => {
            const res = await chaiWithHttp.request.execute(app)
                .post('/login')
                .send(invalidEmailPayload);
            console.log(`res: ${JSON.stringify(res.body)}`);
            expect(res).to.have.status(400);
        });

        it('should reject login when email is missing', async () => {
            const res = await chaiWithHttp.request.execute(app)
                .post('/login')
                .send(missingEmailPayload);
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal('Email is required.');
        });

        it('should set a jwt cookie on a successful login', async () => {
            const res = await chaiWithHttp.request.execute(app)
                .post('/login')
                .send(validLoginPayload);
            expect(res.headers['set-cookie']).to.exist;
        });

        it('should set the access cookie with the correct flags', async () => {
            const res = await chaiWithHttp.request.execute(app)
                .post('/login')
                .send(validLoginPayload);

            const cookies = res.headers['set-cookie'] as unknown as string[];
            const jwtCookie = cookies.find((c) => c.startsWith('access='));
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