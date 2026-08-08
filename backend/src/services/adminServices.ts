import {UserTable} from "../database/tableOperations/User.table.ts";
import {Role} from "../database/types/user.service.types.ts";
import type {SignUpRequest} from "../database/types/user.service.types.ts";
import {hash} from "bcryptjs";

const userTable: UserTable = new UserTable();
const userModel = userTable.getModel();

type AdminCreateRequest = SignUpRequest;

function validateProfileData(profileData: AdminCreateRequest){
    let {password, email} = profileData;

    if (!password || password.trim() === "") {
        throw Error("Password is required.");
    }
    if (!email || email.trim() === "") {
        throw Error("Email is required.");
    }
}

async function validateEmail(normalizedEmail: string){
    // Basic validation for email format
    const simpleEmailRegex = /^\S+@\S+\.\S+$/;
    if (!simpleEmailRegex.test(normalizedEmail)) {
        throw Error("Please enter a valid email address like name@example.com.");
    }

    // Ensure the email is unique for the account
    const existingByEmail = await userModel.findOne({ email: normalizedEmail });
    if (existingByEmail) {
        throw Error("An account with this email already exists. Please use a different email address.");
    }

}

//Creates a new user account and returns the newly created user.
export async function createAdmin(profileData: AdminCreateRequest) {
    try{
        validateProfileData(profileData);
    }catch(error){
        throw error;
    }

    let {username, password, email} = profileData;
    if (!username || username.trim() === "") {
        username = email;
    }

    const normalizedUsername = username.trim();
    const normalizedEmail = email.trim().toLowerCase();

    try{
        await validateEmail(normalizedEmail);
    }catch(error){
        throw error;
    }

    profileData.username = normalizedUsername;
    profileData.email = normalizedEmail;
    profileData.roles = [Role.ADMIN];

    try {
        profileData.password = await hash(password, 10);
        await userTable.createUser(profileData);
    } catch (error) {
        throw Error("Error creating account", {cause: error});
    }

    // Check that the account has been created
    const newAdminDoc = await userTable.findNewlyCreatedUser(profileData);
    if (!newAdminDoc || !newAdminDoc._id) throw Error("Error, failed to create account");
    return newAdminDoc;
}
