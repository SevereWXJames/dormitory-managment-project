import mqtt from "mqtt";
import {handleMQTTError, handleMQTTMessage} from "../services/mqttServices.ts";
import {facilityTopics, topicBaseString} from "./IoTConstants.ts";

function constructTopicString(topic: string) {
    return topicBaseString + topic;
}

export function setUpMQTT() {
    const client = mqtt.connect(process.env.MQTT_URI as string);

    client.on("connect", () => {
        console.log("MQTT broker connected");
        facilityTopics.forEach((topic) => {
            client.subscribe(constructTopicString(topic));
        });
    });

    client.on("message", (topic, message) => {
        const messageAsString =  new TextDecoder().decode(message);
        handleMQTTMessage(topic, messageAsString);
    });

    client.on("error", (error) => {
        handleMQTTError(error);
    });
}