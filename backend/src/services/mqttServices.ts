import {IoTDeviceServices} from "./IoT/IoTDeviceServices.ts";

export async function handleMQTTMessage(topic: string, message: string) {
    const topicParts = topic.split("/");
    if (topicParts.length < 1 || topicParts[0] !== "SmartAPT") {
        return; // message is not one of our messages or there is no topic (???)
    }

    const messageObject: object = JSON.parse(message);
    if (!Object.hasOwn(messageObject, "uuid")) {
        console.log("Error! Data object has no UUID!");
        return; // it has no uuid, can't identify it
    }

    const IoTServices = new IoTDeviceServices();
    await IoTServices.handleIncomingIoTData(messageObject);
}

export function handleMQTTError(error: Error) {
    console.error(error);
}
