import {BaseTable} from "./Base.table.ts";
import type {Model} from "mongoose";
import {Types} from "mongoose"
import {ResidentModel, type Resident} from "../../dataTypes/user.ts";

export class ResidentTable extends BaseTable<Resident> {
    private ResidentModel : Model<Resident>;
    constructor() {
        super(ResidentModel);
        this.ResidentModel = super.getModel();
    }

    // Creates a user in the Users table.
    // If the user is a resident, creates a resident in the Resident table and a balance in the CreditBalance table
    async createResident(userId: Types.ObjectId, roomId?: string) {
        try {
            const resident = {userId: userId, roomId: roomId ?? null};
            const doc = new this.ResidentModel(resident);
            await doc.save();
        } catch (error) {
            console.log(`Error:${error}`);
            throw Error("Error creating Resident", {cause: error});
        }

    }

    async findNewlyCreatedResident(userId: Types.ObjectId) {
        return await this.ResidentModel.findOne({userId: userId}).exec();
    }

    async deleteResident(userId: Types.ObjectId) {
        const filter = {userId: userId}
        return await this.ResidentModel.findOneAndDelete(filter).exec();
    }

    async findResident(userId: Types.ObjectId) {
        const filter = {userId: userId};
        return await this.ResidentModel.find(filter).exec();
    }
}