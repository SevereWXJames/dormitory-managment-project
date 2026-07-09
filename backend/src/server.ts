import {connectMongo} from "./database/database.ts";
import app from "./app.ts";

const port: number = 3000;

await connectMongo().then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        })
    }
).catch((err) => {
    console.log("Connection failed: " + err.message)
});