import mqtt, {MqttClient} from "mqtt";
import {facilityTopics, topicBaseString} from "./IoTConstants.ts";
import {handleMQTTError, handleMQTTMessage} from "../services/IoT/mqttServices.ts";

function constructTopicString(topic: string) {
    return topicBaseString + topic;
}

class MQTTConnection {

    private static client: MqttClient | undefined = undefined;

    public static async setUpMQTT() {
        console.log("uri", process.env.MQTT_URI);
        const client = await mqtt.connectAsync(process.env.MQTT_URI as string);
        console.log("MQTT broker connected");

        await Promise.all(facilityTopics.map(async (topic) => {
            await client.subscribeAsync(constructTopicString(topic));
        }));

        client.on("message", (topic, message) => {
            const messageAsString =  new TextDecoder().decode(message);
            handleMQTTMessage(topic, messageAsString);
        });

        client.on("error", (error) => {
            handleMQTTError(error);
        });

        this.client = client;
    }

    public static getClient(): MqttClient {
        if (this.client === undefined) {
            throw new Error("Client not connected");
        }
        return this.client as MqttClient;
    }
}

export default MQTTConnection;