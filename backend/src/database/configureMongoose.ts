import mongoose from "mongoose";

export const connectMongoose = async () => {
    try {
        const conn = await mongoose.connect((process.env.MONGODB_URL as string) + (process.env.DATABASE_NAME as string));
        console.log(`Mongoose Connected: ${conn.connection.host}`);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(`Error: ${error.message}`);
        }
        process.exit(1);
    }
}

export async function loadTestData() {

}