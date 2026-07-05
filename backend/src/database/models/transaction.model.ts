import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../databaseConstants.ts";

const TransactionSchema = new Schema({_id: String, userId: String, description: String, transaction: Number});

const TransactionModel = mongoose.model("transactions"  as CollectionName, TransactionSchema);
export default TransactionModel;