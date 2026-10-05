import {readFile} from "node:fs/promises";
import {connect} from "mqtt";

const baseTopicString = "SmartAPT/app/";
const mosquittoURI = process.env.IS_DOCKER !== undefined ? "mqtt://host.docker.internal:1883" : "mqtt://localhost:1883"

async function readData() {
    try {
        return await readFile("./data/data.json", "utf8");
    }
    catch (error) {
        process.exit(2);
        return "";
    }
}

function parseMultiFileContents(rawJSON) {
    try {
        const data = JSON.parse(rawJSON);
        if (!Object.hasOwn(data, "topics")) {
            console.error("Not all data provided.");
            process.exit(2);
        }
        return data;
    } catch (error) {
        console.error("Invalid file contents.");
        process.exit(2);
        return {};
    }
}

function constructTopicString(topic) {
    return baseTopicString + topic;
}

function handleFacilityBooked(uuid, data) {
    const startDate = new Date(data.date);
    const dateString = startDate.toString();
    console.log(`IoT facility with UUID ${uuid} booked by user with ID ${data.userId} for ${data.durationSeconds} seconds starting at ${dateString}.`)
}

async function main() {
    const client = connect(mosquittoURI);

    client.on("connect", async () => {
        if (client.connected === true) {
            const rawJSON = await readData();
            const data = parseMultiFileContents(rawJSON);
            data.topics.forEach((topic) => {
                client.subscribe(constructTopicString(topic));
            });
            console.log("MQTT connected and listening...");
        }
    });

    client.on("message", (topic, message) => {
        console.log(`Received message on topic: ${topic}.`);
        const messageAsString =  new TextDecoder().decode(message);
        try {
            const messageObj = JSON.parse(messageAsString);
            switch (messageObj.type) {
                case ("facilityBooked"): {
                    handleFacilityBooked(messageObj.UUID, messageObj.data);
                    break;
                }
            }
        } catch (e) {
            console.log("Message malformed!");
        }
    });
}

main();

