import serviceJSON from "../../test_data/services.json" with { type: "json" };
export async function getAllServices() {
    return serviceJSON.services;
}
export async function getServiceById(id) {
    const testService = serviceJSON.services.find((service) => {
        return service._id === id;
    });
    return testService;
}
//# sourceMappingURL=serviceServices.js.map