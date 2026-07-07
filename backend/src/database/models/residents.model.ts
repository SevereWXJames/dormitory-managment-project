import mongoose, {Schema, Types, Document} from 'mongoose';

export interface IResident extends Document{
    _id: Types.ObjectId;
    userId: Types.ObjectId,
    roomId: string | null
}

const ResidentSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'Users',
        required: [true, "Please enter a userId"],
    },

    roomId: {
        type: String,
        required: false,
        default: null
    }
});

export const Residents = mongoose.model<IResident>('Users', ResidentSchema);