import * as chai from "chai";
import chaiHttp from "chai-http";
import {after, before, describe, it} from "mocha";
import {clearTestDB, closeTestDB, connectTestDB} from "../setup/setup.ts";
import app from "../../src/app.ts";
import loadSampleData from "../../src/database/loadDatabase.ts";
import mongoose from "mongoose";
import {ServiceModel} from "../../src/dataTypes/service.ts";

const chaiWithHttp = chai.use(chaiHttp);
const {expect} = chai;

describe('FACILITY BOOKING SERVICES', () => {
    before(async () => {
        console.log('file loaded');
        await connectTestDB();
        await loadSampleData();
        console.log("Loaded sample data");
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

        beforeEach('HTTP Response - Log in', async () => {
            try{
                const res = await chaiWithHttp.request.execute(app)
                    .post('/login')
                    .send(validLoginPayload);
                const userId = res.body.data._id;
                const cookies = res.headers['set-cookie'] as unknown as string[];
                const rawCookie = cookies.find((c) => c.startsWith('jwt='));

                testJwt = rawCookie?.split(';')[0];
                testUserId = userId;
            }catch(error){
                throw Error(`Error with logging in! ${error}`);
            }
        });

        afterEach(async () => {
            await closeTestDB();
        });

        it('Get status of IoT service by Id', async () => {
            const serviceId = "service0";
            const res = await chaiWithHttp.request.execute(app)
                .get(`/IoT/get-status-by-id/${serviceId}`)
                .set('Cookie', `${testJwt}`)
                .send();
            console.log(`res: ${JSON.stringify(res.body, null, 2)}`);
            expect(res).to.have.status(200);
        });

        it('Get events from N days ago', async () => {
            const res = await chaiWithHttp.request.execute(app)
                .post(`/IoT/get-events-from-n-days-ago`)
                .set('Cookie', `${testJwt}`)
                .send({ daysAgo: 3 });
            console.log(`res: ${JSON.stringify(res.body, null, 2)}`);
            expect(res).to.have.status(200);
        });

        it('Get all services', async () => {
            const res = await chaiWithHttp.request.execute(app)
                .get(`/services/`)
                .set('Cookie', `${testJwt}`)
                .send();
            console.log(`res: ${JSON.stringify(res.body, null, 2)}`);
            expect(res).to.have.status(200);
        });

        it('Get service by id', async () => {
            const getServices = await chaiWithHttp.request.execute(app)
                .get(`/services/`)
                .set('Cookie', `${testJwt}`)
                .send();
            const data = getServices.body.data;
            const serviceId = data[0]._id;
            const res = await chaiWithHttp.request.execute(app)
                .get(`/services/get-by-id/${serviceId}`)
                .set('Cookie', `${testJwt}`)
                .send();
            console.log(`res: ${JSON.stringify(res.body, null, 2)}`);
            expect(res).to.have.status(200);
        });
    });

    describe('Reserving Slots', () => {
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

        beforeEach('HTTP Response - Log in', async () => {
            try{
                const res = await chaiWithHttp.request.execute(app)
                    .post('/login')
                    .send(validLoginPayload);
                const userId = res.body.data._id;
                const cookies = res.headers['set-cookie'] as unknown as string[];
                const rawCookie = cookies.find((c) => c.startsWith('jwt='));

                testJwt = rawCookie?.split(';')[0];
                testUserId = userId;
            }catch(error){
                throw Error(`Error with logging in! ${error}`);
            }
        });

        afterEach(async () => {
            await closeTestDB();
        });

        it('Get slots by service Id', async () => {
            const serviceId = "service0";
            const res = await chaiWithHttp.request.execute(app)
                .get(`/reservations/get-slots-by-service/${serviceId}`)
                .set('Cookie', `${testJwt}`)
                .send();
            console.log(`res: ${JSON.stringify(res.body, null, 2)}`);
            expect(res).to.have.status(200);
        });

        it('Book a slot by service Id', async () => {
            const serviceId = "service0";
            const slotsRes = await chaiWithHttp.request.execute(app)
                .get(`/reservations/get-slots-by-service/${serviceId}`)
                .set('Cookie', `${testJwt}`)
                .send();
            const slots = slotsRes.body.data;
            const slotId = slots[0]._id;

            const res = await chaiWithHttp.request.execute(app)
                .get(`/reservations/book-slot-by-service/${serviceId}`)
                .set('Cookie', `${testJwt}`)
                .send(slotId);
            console.log(`res: ${JSON.stringify(res.body, null, 2)}`);
            expect(res).to.have.status(200);
        });

        it('Unbook a slot by service Id', async () => {
            const serviceId = "service0";
        });

    });
});