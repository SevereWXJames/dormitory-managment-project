import userJson from "../../test_data/users.json" with { type: "json" };
import jwt, {} from "jsonwebtoken";
export async function checkLogIn(username, password) {
    return true;
}
export async function getExistingUserFromUsername(username) {
    const testUser = userJson.users.find((user) => {
        return user.username === username;
    });
    return testUser;
}
export async function getExistingUserFromId(_id) {
    const testUser = userJson.users.find((user) => {
        return user._id === _id;
    });
    return testUser;
}
export function createToken(_id, username) {
    let secret = process.env.SECRET_KEY;
    if (secret === undefined) {
        console.log("NO SECRET PROVIDED!!!");
        secret = "testvalue"; //for debug
    }
    return jwt.sign({
        _id: _id,
        username: username
    }, secret, { expiresIn: "1h" });
}
//# sourceMappingURL=usersServices.js.map