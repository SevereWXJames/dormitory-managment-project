import {connectMongo} from "./database/database.ts";
import app from "./app.ts";
import {setUpMQTT} from "./utility/mqttSetup.ts";

const port: number = 3000;

// if (process.env.LOAD_SAMPLE_DATA !== undefined) {
//    await loadSampleData();
// }

await connectMongo().then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        })
    })
    .then(() => {setUpMQTT()})
    .catch((err) => {
    console.log("Connection failed: " + err.message)
});