import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../databaseConstants.ts";

const userSchema = new Schema({_id: String, username: String, email: String, phoneNumber: String, roles: Array});

const UserModel = mongoose.model("users"  as CollectionName, userSchema);
export default UserModel;