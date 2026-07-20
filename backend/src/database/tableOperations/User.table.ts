import {BaseTable} from "./Base.table.ts";
import type {SignUpRequest} from "../types/user.service.types.ts";
import {UserModel, type User} from "../../dataTypes/user.ts";

export class UserTable extends BaseTable<User> {
    constructor() {
        super(UserModel);
    }

    // Creates a user in the Users table.
    // If the user is a resident, creates a resident in the Resident table and a balance in the CreditBalance table
    async createUser(profileData: SignUpRequest) {
        try {
            const doc = new UserModel(profileData);
            await doc.save();
        } catch (error) {
            throw Error("Error creating user", {cause: error});
        }

    }

    async findNewlyCreatedUser(profileData: SignUpRequest) {
        return await UserModel.findOne(profileData).exec();
    }

    async deleteUser(username: string, email: string) {
        const filter = {username: username, email: email}
        return await UserModel.findOneAndDelete(filter).exec();
    }

    async findUser(username: string, email: string) {
        const filter = {username: username, email: email}
        return await UserModel.find(filter).exec();
    }
}