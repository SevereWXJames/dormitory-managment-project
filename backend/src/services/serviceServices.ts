import serviceJSON from "../../test_data/services.json" with {type: "json"};
import type {Service} from "../dataTypes/service.ts";

export async function getAllServices(): Promise<Service[]> {
    return serviceJSON.services as Service[];
}

export async function getServiceById(_id: string): Promise<Service> {
    const testService = serviceJSON.services.find((service) => {
        return service._id === _id;
    });
    return testService as Service;
}