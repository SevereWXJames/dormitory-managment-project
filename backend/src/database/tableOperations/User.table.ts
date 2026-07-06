import {type IUser, Users} from "../models/users.model.js";
import {BaseTable} from "./Base.table.js";
import type {SignUpRequest} from "../types/user.service.types.js";

export class UserTable extends BaseTable<IUser>{
    constructor() {
        super(Users);
    }

    async createUser(profileData : SignUpRequest){
        const doc = new Users(profileData);
        await doc.save();
    }

    async findNewlyCreatedUser(profileData : SignUpRequest){
        return await Users.find(profileData).exec();
    }

    async deleteUser(username: string, email:string){
        const filter = {username: username, email: email}
        return await Users.findOneAndDelete(filter).exec();
    }

    async findUser(username: string, email:string){
        const filter = {username: username, email: email}
        return await Users.find(filter).exec();
    }
}