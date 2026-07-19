import {Model, Document} from "mongoose";
import {fileURLToPath} from "url";
import path from "path";
import fs from "fs";
import {type User} from "../../dataTypes/user.ts"

type TransformFn<T> = (docs: T[]) => Promise<T[]>;

export class BaseTable<T extends Document>{
    private readonly model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    getModel(){
        return this.model;
    }

    readFile(filepath: string) {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const relpath = path.join(__dirname, filepath);

        return JSON.parse(fs.readFileSync(relpath, 'utf8'));
    }

    async seedTable(filepath: string, transformFn?: TransformFn<User>) {
        try {
            const docs = await this.readFile(filepath)
            const transformed = transformFn ? await transformFn(docs) : docs;
            await this.model.insertMany(transformed);
        } catch (err) {
            throw new Error(`Seeding failed`, {cause: err});
        }
    }

    async clearTable() {
        try{
            return await this.model.deleteMany({});
        }catch(err){
            throw Error(`Error: clearing table failed`, {cause: err});
        }
    }

}