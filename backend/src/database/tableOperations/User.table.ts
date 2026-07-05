import {type IUser, Users} from "../models/users.model.js";
import {BaseTable} from "./Base.table.js";

export class UserTable extends BaseTable<IUser>{
    constructor() {
        super(Users);
    }

    async createUser(email: string, password: string, username?:string,){
        const row = {username, email, password}
        const doc = new Users(row);
        await doc.save();
    }

    async deleteUser(username: string, email:string){
        const filter = {username: username, email: email}
        return Users.findOneAndDelete(filter);
    }

    async findUser(username: string, email:string){
        const filter = {username: username, email: email}
        return Users.find(filter);
    }
}