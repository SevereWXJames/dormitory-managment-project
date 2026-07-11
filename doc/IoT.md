# IoT Information


## General IoT Data Structure

There are two primary types data structures associated with the IoT system in SmartAPT, IoT Statuses and IoT Events.

IoT statuses or logical statuses are database objects associated with IoT enabled services that represent the logical status of that service.
Currently, there is only one type of IoT status object, however more may be implemented in the future.
The IoT status object has two fields, `inUse` and `outOfService`.
`inUse` represents if the device is currently running.
`outOfService` represents if the device is broken down at the moment.

These flags can be controlled by sending messages to the MQTT Server. 
The details of sending messages to the MQTT server is listed below.

When the backend receives a message it records it as an IoT event in the database.
IoT events represent sent messages to the server.
They include information about the contents of the message (`type` and `data` fields), which device sent it (`UUID` field), and at what time the message was sent (`createdAt` field).

## General IoT Message Structure

When sending IoT data to the MQTT broker, it must be sent in JSON string format to be processed by our app.

These JSON strings have the following fields in the object.
Any other fields will be ignored when being processed by our app.


## IoT Message JSON Fields

### UUID

This field is required to identify which device is sending the message.
It should be formatted as a UUID string.

**Valid Values:**

Any UUID string. Please note that it must match with a service's `IoTUUID` field to be useful when processing the IoT message.

### Type

This is the message "type".
This tells the app how to process the IoT event.
This will probably be renamed in the future to "command".

**Valid Values:**

Right now `type` can only have the values `machineStart`, `machineStop`, `outOfService`, `fix`.

`machineStart` sets the `inUse` flag to true in the `IoTStatus` object in the database. 

`machineStop` sets the `inUse` flag to false in the `IoTStatus` object in the database. 

`outOfService` sets the `outOfService` flag to true in the `IoTStatus` object in the database. 

`fix` sets the `outOfService` flag to false in the `IoTStatus` object in the database. 

### Data

This field is unused in the current implementation.
In the future this data object will be used by the app to process more complicated IoT message types.

**Valid Values:**

Any valid JSON object.