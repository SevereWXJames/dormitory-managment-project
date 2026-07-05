import {type IUser, Users} from "../models/users.model.js";
import {BaseTable} from "./Base.table.js";

export class UserTable extends BaseTable<IUser>{
    public static model = Users;
    // public static model = database.mongoose.model("users" as CollectionName,
    //     new Schema({_id: String, username: String, email: String, phoneNumber: String, roles: Array}));
    constructor() {
        super(UserTable.model);
    }
}