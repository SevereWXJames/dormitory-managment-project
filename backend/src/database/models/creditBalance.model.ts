import mongoose, {Schema, Types, Document} from 'mongoose';

export interface ICreditBalance extends Document{
    _id: Types.ObjectId;
    userId: Types.ObjectId,
    balanceCents: number;
}

const CreditBalanceSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'Users',
        unique: true,
        required: [true, "Please enter a userId"],
    },

    balanceCents: {
        type: Number,
        required: true,
        default: 0,
    }
});

export const CreditBalances = mongoose.model<ICreditBalance>("CreditBalances", CreditBalanceSchema, "CreditBalances");