import mongoose from "mongoose";
import type {CollectionName} from "../databaseConstants.ts";

const creditBalanceSchema = new mongoose.Schema({_id: String, userId: String, balanceCents: Number});

const CreditBalanceModel = mongoose.model("credit_balance"  as CollectionName, creditBalanceSchema);
export default CreditBalanceModel;