import {connectMongo} from "./database/database.ts";
import app from "./app.ts";
import {setUpMQTT} from "./utility/mqttSetup.ts";
import loadSampleData, { ensureAdminExists } from "./database/loadDatabase.ts";

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

// Ensure at least one admin exists on startup regardless of sample-data flag
await ensureAdminExists().catch((err) => {
    console.error("Error ensuring initial admin exists:", err);
});