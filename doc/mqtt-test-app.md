# MQTT Test App Documentation

## Purpose

The MQTT test app is a test app meant to mock the functionality of an IoT device talking to our server.
The app sends MQTT messages to the broker url contained in the app. To run the app use `node mqtt-test-app.js` and the arguments documented below.

## Arguments

### -f

File read mode flag. If this flag is added, all other flags are ignored, and instead the app will read from the `data/data.json` file. 
`data.json` structure reference can be found in the `examples` folder.

### -u
The UUID argument. All IoT devices registered to the app have a UUID that corresponds to the physical ID of the machine.
Use this flag, with a UUID following it to set the messages `UUID` field.
This flag is necessary if `-f` is not used.

### -c
The type (or command) argument. 
Specify the IoT message type as a string after this flag.
This flag is necessary if `-f` is not used.

### -t

The MQTT topic argument.
Specify the IoT topic as a string after this flag.
This flag is necessary if `-f` is not used.

## Data folder

The data folder contains a `data.json` file that will be read when running the script. It specifies the MQTT topic and message data.
Like before, a `topic` field is required for the file mode to run successfully.

Depending on if the multi-message mode `-m` flag is set, the file will either need a `message` field or a `messages` field.
This is either a single object, or array of objects that will be sent as MQTT messages. It is **strongly recommended** that these objects have a `UUID` and `type` field as mentioned above, but this is **not enforced**.
Both of these fields are required for the MQTT to work properly with the app.

Given the complexity of these rules, example files have been provided in the `data/examples` folder.
I strongly recomend you use them as templates or reference when writing your own.

## Examples

To send a message from file use the command: `node mqtt-test-app.js -f`.

The expected output with the multi-message example data file should be:

```
sending message: "{"UUID":"1586d8a9-3559-42ee-a7ed-36ee249506bb","type":"machineStart"}" on topic: "SmartAPT/facility/washingMachine"
sending message: "{"UUID":"1586d8a9-3559-42ee-a7ed-36ee249506bb","type":"machineStop"}" on topic: "SmartAPT/facility/washingMachine"
```

To send a message from command line use the command: `node mqtt-test-app.js -u 1586d8a9-3559-42ee-a7ed-36ee249506bb -c machineStart -t washingMachine`

The expected output with the multi-message example data file should be:

```
sending message: "{"UUID":"1586d8a9-3559-42ee-a7ed-36ee249506bb","type":"machineStart"}" on topic: "SmartAPT/facility/washingMachine"
```