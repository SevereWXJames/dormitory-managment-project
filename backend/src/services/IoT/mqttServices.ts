import {handleIncomingIoTData} from "./IoTDeviceServices.ts";
import MQTTConnection from "../../utility/mqtt.ts";

export async function handleMQTTMessage(topic: string, message: string) {
    const topicParts = topic.split("/");
    if (topicParts.length < 1 || topicParts[0] !== "SmartAPT") {
        return; // message is not one of our messages or there is no topic (???)
    }

    const messageObject: object = JSON.parse(message);
    if (!Object.hasOwn(messageObject, "UUID")) {
        console.log("Error! Data object has no UUID!");
        return; // it has no uuid, can't identify it
    }

    await handleIncomingIoTData(messageObject);
}

export function handleMQTTError(error: Error) {
    console.error(error);
}

export async function sendMQTTMessage(obj: object, topic: string) {
    const client = MQTTConnection.getClient();
    if (!client.connected) {
        return;
    }

    await client.publishAsync(topic, JSON.stringify(obj), {qos: 1});
}