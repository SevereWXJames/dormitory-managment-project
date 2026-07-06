import dotenv from "dotenv";
import {connectMongo} from "./database/database.ts";
import app from "./app.ts";

dotenv.config();
const port: number = 3000;

await connectMongo().then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        })
    }
).catch((err) => {
    console.log("Connection failed: " + err.message)
});