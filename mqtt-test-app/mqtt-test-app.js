import {parseArgs} from "node:util";
import {readFile} from "node:fs/promises";
import {connect} from "mqtt";

const baseTopicString = "SmartAPT/facility/";
const mosquittoURI = process.env.IS_DOCKER !== undefined ? "mqtt://host.docker.internal:1883" : "mqtt://localhost:1883"

const options = {
    fileReadMode: {type: "boolean", short: "f", default: false},
    uuid: {type: "string", short: "u"},
    type: {type: "string", short: "e"},
    topic: {type: "string", short: "t"}
}

const mqttOptions = {
    qos: 1
}

async function sendMQTTMessage(client, obj, topic) {
    console.log(`sending message: \"${JSON.stringify(obj)}\" on topic: \"${topic}\"`);
    await client.publishAsync(topic, JSON.stringify(obj), mqttOptions);
}

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
        if (!Object.hasOwn(data, "topic") || !Object.hasOwn(data, "messages")) {
            console.error("Not all data provided.");
            process.exit(2);
        }
        return data;
    }
    catch (error) {
        console.error("Invalid file contents.");
        process.exit(2);
        return {};
    }
}

async function sendMessageFromFile(client) {
    const rawJSON = await readData();
    const data = parseMultiFileContents(rawJSON);
    const fullTopicString = baseTopicString + data.topic;

    try {
        const promises = data.messages.map((message) => {
            return sendMQTTMessage(client, message, fullTopicString);
        })
        await Promise.all(promises);
    }
    catch (error) {
        console.error(error.message);
        process.exit(2);
    }
}


async function sendSingleMessageFromArgs(client, args, topic) {
    const argsObject = {
        UUID: args.uuid,
        type: args.type
    }

    await sendMQTTMessage(client, argsObject, topic);
}

async function main() {
    let parsedArgs = {}
    try {
        parsedArgs = parseArgs({options});
    } catch (error) {
        console.error(error.message);
        process.exit(2);
    }

    const values = parsedArgs.values;

    if (!values.fileReadMode && (values.topic === undefined || values.type === undefined || values.uuid === undefined)) {
        console.error("Not all args provided.");
        process.exit(2);
    }

    const client = connect(mosquittoURI);

    const fullTopicString = baseTopicString + values.topic;

    client.on("connect", async () => {
        if (client.connected === true) {
            if (values.fileReadMode) {
                await sendMessageFromFile(client);
            }
            else {
                await sendSingleMessageFromArgs(client, values, fullTopicString);
            }
        }
        process.exit(1);
    });
}

main();

