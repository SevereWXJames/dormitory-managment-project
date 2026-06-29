import roomJSON from "../../test_data/rooms.json" with { type: "json" };
import residentJSON from "../../test_data/residents.json" with { type: "json" };
export async function getAllRooms() {
    return roomJSON.rooms;
}
export async function getRoomById(id) {
    const testRoom = roomJSON.rooms.find((room) => {
        return room._id === id;
    });
    return testRoom;
}
export async function getRoomByUserId(id) {
    const resident = await getResidentByUserId(id);
    const testRoom = roomJSON.rooms.find((room) => {
        return room._id === resident.roomId;
    });
    return testRoom;
}
export async function getAllResidents() {
    return residentJSON.residents;
}
export async function getResidentByUserId(id) {
    const testResident = residentJSON.residents.find((resident) => {
        return resident.userId === id;
    });
    return testResident;
}
//# sourceMappingURL=roomServices.js.map