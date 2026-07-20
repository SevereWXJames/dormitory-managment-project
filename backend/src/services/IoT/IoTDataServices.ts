import {type IoTStatus, IoTStatusModel} from "../../dataTypes/IoT/IoTStatus.ts";
import {type IoTEvent, IoTEventModel} from "../../dataTypes/IoT/IoTEvent.ts";
import mongoose from "mongoose";

export async function getStatusForServiceId(serviceId: mongoose.Types.ObjectId): Promise<IoTStatus> {
    const status = await IoTStatusModel.findOne({facilityID: serviceId}).lean().exec();
    return status as IoTStatus;
}

export async function getStatusForServiceByUUID(uuid: string): Promise<IoTStatus> {
    const status = await IoTStatusModel.findOne({UUID: uuid}).lean().exec();
    return status as IoTStatus;
}

export async function getEventsForLastNDays(nDays: number) {
    try{
        let dataArr = [];
        for (let i = 1; i <= nDays; i++) {
            const iDaysAgo = new Date();
            const iMinusOneDaysAgo = new Date();

            iDaysAgo.setDate(iDaysAgo.getDate() - i);
            iDaysAgo.setHours(0, 0, 0, 0);

            iMinusOneDaysAgo.setDate(iMinusOneDaysAgo.getDate() - (i - 1));
            iMinusOneDaysAgo.setHours(0, 0, 0, 0);

            console.log(`from ${iDaysAgo.toUTCString()} to ${iMinusOneDaysAgo.toUTCString()}`);
            const events = await IoTEventModel.find({$and: [ {createdAt: {$gte: iDaysAgo}}, {createdAt: {$lt: iMinusOneDaysAgo}}]}).lean().exec() as IoTEvent[];
            dataArr.push({daysAgo: i, events: events});
        }
        return dataArr;
    }catch(error){
        console.log(`error: ${error}`);
        throw Error("Error getting events", {cause: error} );
    }
}