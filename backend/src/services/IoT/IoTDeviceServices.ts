import {type Service, ServiceModel} from "../../dataTypes/service.ts";
import {type IoTEvent, IoTEventModel} from "../../dataTypes/IoT/IoTEvent.ts";
import {IoTStatusModel} from "../../dataTypes/IoT/IoTStatus.ts";
import mongoose from "mongoose";

export async function handleIncomingIoTData(incomingObj: object) {
    let finalIoTEvent = incomingObj as IoTEvent;

    try {
        const facilityID = await getFacilityID(finalIoTEvent.UUID);
        finalIoTEvent.facilityID = facilityID;

        await saveIoTEvent(finalIoTEvent);

        await updateStatus(finalIoTEvent);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
        }
        else {
            console.log("Unknown error occurred");
        }
    }
}

async function getFacilityID(uuid: string): Promise<mongoose.Types.ObjectId> {
    const result = await ServiceModel.findOne({IoTUUID: uuid}).lean().exec();
    if (result === null) {
        throw new Error("No service has this IoT UUID");
    }
    return (result as Service)._id;
}

async function saveIoTEvent(iotEvent: IoTEvent) {
    const newEvent = new IoTEventModel(iotEvent);
    await newEvent.save();
}

async function updateStatus(iotEvent: IoTEvent) {
    switch (iotEvent.type) {
        case "machineStart": {
            await IoTStatusModel.findOneAndUpdate({facilityID: iotEvent.facilityID}, {inUse: true}).exec();
            break;
        }
        case "machineStop": {
            await IoTStatusModel.findOneAndUpdate({facilityID: iotEvent.facilityID}, {inUse: false}).exec();
            break;
        }
        case "outOfService": {
            await IoTStatusModel.findOneAndUpdate({facilityID: iotEvent.facilityID}, {outOfService: true}).exec();
            break;
        }
        case "fix": {
            await IoTStatusModel.findOneAndUpdate({facilityID: iotEvent.facilityID}, {outOfService: false}).exec();
            break;
        }
    }
}