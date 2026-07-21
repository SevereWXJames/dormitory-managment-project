import {type Service, ServiceModel} from "../dataTypes/service.ts";
import mongoose, {Types} from "mongoose";

export async function getAllServices(): Promise<Service[]> {
    const cursor = ServiceModel.find({ }).lean();
    const results: Service[] = [];

    for await (const result of cursor) {
        try {
            if (result != null) {
                results.push(result as Service);
            }
        } catch (e) {
            // "Pass"
        }
    }

    return Promise.resolve(results);
}

export async function getServiceById(_id: mongoose.Types.ObjectId): Promise<Service | undefined> {
    return ServiceModel.findById({_id}).lean().exec()
        .then((result) => {
            if (result != null) {
                return Promise.resolve(result as Service);
            }
            return Promise.resolve(undefined);
        })
        .catch((e) => {
            return Promise.reject(e);
        });
}