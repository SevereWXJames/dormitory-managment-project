import {BaseTable} from "./Base.table.ts";
import type {Model} from "mongoose";
import {Types} from "mongoose"
import {type CreditBalance, CreditBalanceModel} from "../../dataTypes/creditBalance.ts";

export class CreditBalanceTable extends BaseTable<CreditBalance> {
    private readonly CreditBalancesModel : Model<CreditBalance>;
    constructor() {
        super(CreditBalanceModel);
        this.CreditBalancesModel = super.getModel();
    }

    // Creates a user in the Users table.
    // If the user is a resident, creates a resident in the Resident table and a balance in the CreditBalance table
    async createBalance(userId: Types.ObjectId, balanceCents?: string) {
        try {
            const resident = {userId: userId, balanceCents: balanceCents ?? 0};
            const doc = new this.CreditBalancesModel(resident);
            await doc.save();
        } catch (error) {
            console.log(`Error:${error}`);
            throw Error("Error creating balance", {cause: error});
        }

    }

    async incrementBalance(userId: Types.ObjectId, amount: number){
        const filter = {userId: userId};
        const update = {$inc: {balanceCents: amount}};
        const options = {new: true};
        return await this.CreditBalancesModel.findOneAndUpdate(filter, update, options).lean().exec();
    }

    async findNewlyCreatedBalance(userId: Types.ObjectId) {
        return await this.CreditBalancesModel.findOne({userId: userId}).exec();
    }

    async deleteBalance(userId: Types.ObjectId) {
        const filter = {userId: userId}
        return await this.CreditBalancesModel.findOneAndDelete(filter).exec();
    }

    async findBalance(userId: Types.ObjectId) {
        const filter = {userId: userId};
        return await this.CreditBalancesModel.find(filter).exec();
    }
}