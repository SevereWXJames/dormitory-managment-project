import {connectMongo} from "./database/database.ts";
import app from "./app.ts";
import {setUpMQTT} from "./utility/mqttSetup.ts";
import loadSampleData from "./database/loadDatabase.ts";

const port: number = 3000;

await connectMongo().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })
}).then(async () => {
    if (process.env.LOAD_SAMPLE_DATA) {
        await loadSampleData();
        console.log("Loaded sample data!");
    }
}).then(() => {
    setUpMQTT();
}).catch((err) => {
    console.log("Connection failed: " + err.message)
});