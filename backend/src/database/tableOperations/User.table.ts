import {type IUser, Users} from "../models/users.model.ts";
import {BaseTable} from "./Base.table.ts";
import type {SignUpRequest} from "../types/user.service.types.ts";

export class UserTable extends BaseTable<IUser>{
    constructor() {
        super(Users);
    }

    async createUser(profileData : SignUpRequest){
        try{
            console.log(`Creating user: ${JSON.stringify(profileData)}`);
            const doc = new Users(profileData);
            await doc.save();
        }catch(error){
            console.log(`Error:${error}`);
            throw Error("Error creating user", {cause: error});
        }

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