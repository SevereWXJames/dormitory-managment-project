import {connectMongo} from "./database/database.ts";
import app from "./app.ts";
import {setUpMQTT} from "./utility/mqttSetup.ts";
import loadSampleData, { ensureAdminExists } from "./database/loadDatabase.ts";

const port: number = 3000;
const shouldLoadSampleData = process.env.LOAD_SAMPLE_DATA === "true" || process.env.LOAD_SAMPLE_DATA === "1";

await connectMongo().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })
}).then(async () => {
    if (shouldLoadSampleData) {
        await loadSampleData();
        console.log("Loaded sample data!");
    } else {
        await ensureAdminExists();
        console.log("Ensured fallback admin exists.");
    }
}).then(() => {
    setUpMQTT();
}).catch((err) => {
    console.log("Connection failed: " + err.message)
});