import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../databaseConstants.ts";

const UserSchema = new Schema({_id: String, username: String, email: String, phoneNumber: String, roles: Array});

const UserModel = mongoose.model("users"  as CollectionName, UserSchema);
export default UserModel;