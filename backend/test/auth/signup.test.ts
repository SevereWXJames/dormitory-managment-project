import * as chai from "chai";
import chaiHttp from "chai-http";
import { after, afterEach, before, describe, it } from "mocha";
import {assert} from "chai";
import {clearTestDB, closeTestDB, connectTestDB} from "../setup/setup.ts";
import app from "../../src/app.ts";
import {ResidentModel} from "../../src/dataTypes/user.ts";
import {UserModel} from "../../src/dataTypes/user.ts";
import {CreditBalanceModel} from "../../src/dataTypes/creditBalance.ts";


const chaiWithHttp = chai.use(chaiHttp);
const { expect } = chai;
const Users = UserModel;

describe('POST /signup', () => {
    before(async () => {
        console.log('file loaded');
        await connectTestDB();
        await clearTestDB();
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

    describe('HTTP Response - SignUp', () => {
        afterEach(async () => {
            await clearTestDB();
        });

        it('should return 200 on successful signup', async () => {
            const res = await chaiWithHttp.request.execute(app)
                .post('/signup')
                .send(validSignupPayload);

            expect(res).to.have.status(200);
        });

        it('should set a jwt cookie on a successful signup', async() => {
            const res = await chaiWithHttp.request.execute(app)
                .post('/signup')
                .send(validSignupPayload);
            expect(res.headers['set-cookie']).to.exist;

        });

        it('should set the access token with the correct flags', async() => {
            const res = await chaiWithHttp.request.execute(app)
                .post('/signup')
                .send(validSignupPayload);

            const cookies = res.headers['set-cookie'] as unknown as string[];
            const jwtCookie = cookies.find((c) => c.startsWith('access='));
            expect(jwtCookie).to.exist;
            expect(jwtCookie).to.include('HttpOnly');
            expect(jwtCookie).to.include('Secure');
            expect(jwtCookie).to.include('SameSite=Strict');
        });

        it('should have the expected response fields on success', async() =>  {
            const res = await chaiWithHttp.request.execute(app)
                .post('/signup')
                .send(validSignupPayload);
            const data = res.body.data;
            expect(data?._id).to.exist;
            expect(data?.username).to.exist;
            expect(data?.email).to.exist;
            expect(data?.roles).to.exist;
        });

        it('should have the expected userid on success', async () => {
            const res = await chaiWithHttp.request.execute(app)
                .post('/signup')
                .send(validSignupPayload);
            const data = res.body.data;
            const userId = data._id;

            const doc = await Users.findOne({ email: 'alice@tmp.com' }).exec();
            const expectedId = doc!._id!.toString();
            expect(userId).to.equal(expectedId);
        });

        it('should have the expected field values on success', async() =>  {
            const res = await chaiWithHttp.request.execute(app)
                .post('/signup')
                .send(validSignupPayload);
            const data = res.body.data;
            expect(data?.username).to.equal('alice123');
            expect(data?.email).to.equal('alice@tmp.com');
            expect(data?.roles.length > 0);
            expect(data?.roles[0] == "RESIDENT");
        });

        it('should return a helpful error for an invalid email format', async () => {
            const invalidEmailPayload = {
                ...validSignupPayload,
                email: 'not-an-email',
            };

            const res = await chaiWithHttp.request.execute(app)
                .post('/signup')
                .send(invalidEmailPayload);

            expect(res).to.have.status(400);
            expect(res.body.message).to.match(/valid email/i);
        });

        it('should allow the same username when the email is different', async () => {
            await chaiWithHttp.request.execute(app)
                .post('/signup')
                .send(validSignupPayload);

            const duplicateUsernamePayload = {
                ...validSignupPayload,
                email: 'alice2@tmp.com',
            };

            const res = await chaiWithHttp.request.execute(app)
                .post('/signup')
                .send(duplicateUsernamePayload);

            expect(res).to.have.status(200);
            expect(res.body.data.email).to.equal('alice2@tmp.com');
        });
    })

    describe('DB Tests - SignUp', () => {
        afterEach(async () => {
            await clearTestDB();
        });

        it('should create a user inside the Users datatable', async() => {
            const res = await chaiWithHttp.request.execute(app)
                .post('/signup')
                .send(validSignupPayload);

            const user = await Users.findOne({ email: 'alice@tmp.com' });
            expect(user).to.exist;
            expect(user?.username).to.equal('alice123');
            expect(user?.name).to.equal('Alice Dyer');
        });

        it('should create a resident inside the Resident datatable', async() => {
            const res = await chaiWithHttp.request.execute(app)
                .post('/signup')
                .send(validSignupPayload);
            console.log(`res: ${JSON.stringify(res)}`);
            const userId = res.body.data._id;
            const resident = await ResidentModel.findOne({ userId: userId }).exec();
            expect(resident).to.exist;
        });

        it('should create a balance inside the CreditsBalance datatable', async() => {
            const res = await chaiWithHttp.request.execute(app)
                .post('/signup')
                .send(validSignupPayload);
            const userId = res.body.data._id;
            const balance = await CreditBalanceModel.findOne({ userId: userId });
            expect(balance).to.exist;
            expect(balance?.balanceCents).to.equal(0);
        });

    })

});