import * as chai from "chai";
import chaiHttp from "chai-http";
import {after, before, describe, it} from "mocha";
import {clearTestDB, connectTestDB} from "../setup/setup.ts";
import app from "../../src/app.ts";
import loadSampleData from "../../src/database/loadDatabase.ts";
import {Types} from "mongoose";
import {CreditBalanceTable} from "../../src/database/tableOperations/CreditBalance.table.ts";
import {BOOKING_COST} from "../../src/utility/pricesForBookings.ts";
import {CreditBalanceModel} from "../../src/dataTypes/creditBalance.ts";
import {ReservationSlotModel} from "../../src/dataTypes/reservationSlot.ts";

const chaiWithHttp = chai.use(chaiHttp);
const {expect} = chai;
const CreditBalances = CreditBalanceModel;

describe('FACILITY BOOKING SERVICES', () => {
    before(async () => {
        console.log('file loaded');
        await connectTestDB();
        await loadSampleData();
        console.log("Loaded sample data");
    });

    after(async () => {
        await clearTestDB();
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
                const rawCookie = cookies.find((c) => c.startsWith('access='));

                testJwt = rawCookie?.split(';')[0];
                testUserId = userId;
            }catch(error){
                throw Error(`Error with logging in! ${error}`);
            }
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
                .send({ daysAgo: 30 });
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
                const rawCookie = cookies.find((c) => c.startsWith('access='));

                testJwt = rawCookie?.split(';')[0];
                testUserId = userId;
            }catch(error){
                throw Error(`Error with logging in! ${error}`);
            }
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

        it('Book a slot by service Id - failure, not enough credits', async () => {
            const serviceId = "service0";
            const slotsRes = await chaiWithHttp.request.execute(app)
                .get(`/reservations/get-slots-by-service/${serviceId}`)
                .set('Cookie', `${testJwt}`)
                .send();
            const slots = slotsRes.body.data;
            console.log(`slots: ${JSON.stringify(slotsRes.body)}`);
            const slotId = slots[0]._id;

            const res = await chaiWithHttp.request.execute(app)
                .put(`/reservations/book-slot-by-service/${serviceId}`)
                .set('Cookie', `${testJwt}`)
                .send({userId: testUserId, slotId: slotId});
            console.log(`res: ${JSON.stringify(res.body, null, 2)}`);
            const booking = res.body.data;
            expect(res).to.have.status(500);

            const userId = new Types.ObjectId(testUserId);
            const balanceDoc = await CreditBalances.findOne({userId}).lean().exec();
            expect(balanceDoc?.balanceCents).to.equal(0);
        });

        it('Book a slot by service Id - success enough credits', async () => {
            const serviceId = "service0";
            const balanceTable = new CreditBalanceTable();
            const userId = new Types.ObjectId(testUserId);
            const update = await balanceTable.incrementBalance(userId, BOOKING_COST);

            let balanceDoc = await CreditBalances.findOne({userId}).lean().exec();
            expect(balanceDoc?.balanceCents).to.equal(5);

            const slotsRes = await chaiWithHttp.request.execute(app)
                .get(`/reservations/get-slots-by-service/${serviceId}`)
                .set('Cookie', `${testJwt}`)
                .send();
            const slots = slotsRes.body.data;
            const slotId = slots[0]._id;

            const res = await chaiWithHttp.request.execute(app)
                .put(`/reservations/book-slot-by-service/${serviceId}`)
                .set('Cookie', `${testJwt}`)
                .send({userId: testUserId, slotId: slotId});
            console.log(`res: ${JSON.stringify(res.body, null, 2)}`);

            const booking = res.body.data;
            expect(res).to.have.status(200);
            expect(booking.booked).to.be.true;
            expect(booking.bookedBy).to.be.equal(testUserId);

            balanceDoc = await CreditBalances.findOne({userId}).lean().exec();
            expect(balanceDoc?.balanceCents).to.equal(0);

            const userBooking = await ReservationSlotModel.findOne({bookedBy: userId.toString()}).lean().exec();
            expect(userBooking).to.exist;
        });
    });

    describe('Canceling bookings', () => {
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
                const rawCookie = cookies.find((c) => c.startsWith('access='));

                testJwt = rawCookie?.split(';')[0];
                testUserId = userId;

                //Reset balance:
                const id = new Types.ObjectId(userId);
                const update = {$set: {balanceCents: 0}};
                await CreditBalances.findOneAndUpdate({userId: id}, update);

            }catch(error){
                throw Error(`Error with setup! ${error}`);
            }
        });

        it('Cancel booking by service Id - successful response', async () => {
            const serviceId = "service0";
            const slotsRes = await chaiWithHttp.request.execute(app)
                .get(`/reservations/get-slots-by-service/${serviceId}`)
                .set('Cookie', `${testJwt}`)
                .send();
            const slots = slotsRes.body.data;
            console.log(`slots: ${JSON.stringify(slots)}`);
            const slotId = slots[0]._id;

            const balanceTable = new CreditBalanceTable();
            const userId = new Types.ObjectId(testUserId);
            await balanceTable.incrementBalance(userId, BOOKING_COST * 2);
            let balance = await CreditBalances.findOne({userId: userId});
            console.log(`balance before booking: ${JSON.stringify(balance)}`);

            await chaiWithHttp.request.execute(app)
                .put(`/reservations/book-slot-by-service/${serviceId}`)
                .set('Cookie', `${testJwt}`)
                .send({userId: testUserId, slotId: slotId});

            const res = await chaiWithHttp.request.execute(app)
                .put(`/reservations/cancel-booking-by-service/${serviceId}`)
                .set('Cookie', `${testJwt}`)
                .send({userId: testUserId, slotId: slotId});
            console.log(`res: ${JSON.stringify(res.body, null, 2)}`);

            const booking = res.body.data;
            expect(res).to.have.status(200);
            expect(booking.booked).to.be.false;
            expect(booking.bookedBy).to.be.equal(null);

            const userBooking = await ReservationSlotModel.findOne({bookedBy: userId.toString()}).lean().exec();
            expect(userBooking).to.equal(null);
        });

        it('Cancel booking by service Id - successful refund', async () => {
            const serviceId = "service0";
            const slotsRes = await chaiWithHttp.request.execute(app)
                .get(`/reservations/get-slots-by-service/${serviceId}`)
                .set('Cookie', `${testJwt}`)
                .send();
            const slots = slotsRes.body.data;
            const slotId = slots[0]._id;

            const balanceTable = new CreditBalanceTable();
            const id = new Types.ObjectId(testUserId);
            await balanceTable.incrementBalance(id, BOOKING_COST * 2);
            let balance = await CreditBalances.findOne({userId: id});
            console.log(`balance before booking: ${JSON.stringify(balance)}`);

            await chaiWithHttp.request.execute(app)
                .put(`/reservations/book-slot-by-service/${serviceId}`)
                .set('Cookie', `${testJwt}`)
                .send({userId: testUserId, slotId: slotId});

            const res = await chaiWithHttp.request.execute(app)
                .put(`/reservations/cancel-booking-by-service/${serviceId}`)
                .set('Cookie', `${testJwt}`)
                .send({userId: testUserId, slotId: slotId});
            console.log(`res: ${JSON.stringify(res.body, null, 2)}`);

            balance = await CreditBalances.findOne({userId: id});
            console.log(`balance after cancelling booking: ${JSON.stringify(balance)}`);
            expect(balance?.balanceCents).to.equal(BOOKING_COST * 2);
        });

        it('Cancel booking by service Id - failure response', async () => {
            const serviceId = "service0";
            const slotsRes = await chaiWithHttp.request.execute(app)
                .get(`/reservations/get-slots-by-service/${serviceId}`)
                .set('Cookie', `${testJwt}`)
                .send();
            const slots = slotsRes.body.data;
            const slotId = slots[0]._id;

            const balanceTable = new CreditBalanceTable();
            const id = new Types.ObjectId(testUserId);
            await balanceTable.incrementBalance(id, BOOKING_COST * 2);

            const res = await chaiWithHttp.request.execute(app)
                .put(`/reservations/cancel-booking-by-service/${serviceId}`)
                .set('Cookie', `${testJwt}`)
                .send({userId: testUserId, slotId: slotId});
            console.log(`res: ${JSON.stringify(res.body, null, 2)}`);

            expect(res).to.have.status(500);
        });

        it('Cancel booking by service Id - failure, same balance', async () => {
            const serviceId = "service0";
            const slotsRes = await chaiWithHttp.request.execute(app)
                .get(`/reservations/get-slots-by-service/${serviceId}`)
                .set('Cookie', `${testJwt}`)
                .send();
            const slots = slotsRes.body.data;
            const slotId = slots[0]._id;

            const balanceTable = new CreditBalanceTable();
            const id = new Types.ObjectId(testUserId);
            await balanceTable.incrementBalance(id, BOOKING_COST * 2);
            let balance = await CreditBalances.findOne({userId: id});
            expect(balance?.balanceCents).to.equal(BOOKING_COST * 2);

            const res = await chaiWithHttp.request.execute(app)
                .put(`/reservations/cancel-booking-by-service/${serviceId}`)
                .set('Cookie', `${testJwt}`)
                .send({userId: testUserId, slotId: slotId});
            console.log(`res: ${JSON.stringify(res.body, null, 2)}`);

            expect(res).to.have.status(500);
            balance = await CreditBalances.findOne({userId: id});
            expect(balance?.balanceCents).to.equal(BOOKING_COST * 2);
        });
    })
});