import {type Service, ServiceModel} from "../dataTypes/service.ts";
import {Types} from "mongoose";

export async function getAllServices(): Promise<Service[]> {
    console.log(ServiceModel.db.name, ServiceModel.db.host, ServiceModel.db.port);
    console.log('LIST conn:', ServiceModel.db.host, ServiceModel.db.port, ServiceModel.db.name);

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

export async function getServiceById(_id: string): Promise<Service | undefined> {
    console.log(`_id: ${_id}`);
    console.log(ServiceModel.db.name, ServiceModel.db.host, ServiceModel.db.port);
    console.log('QUERY conn:', ServiceModel.db.host, ServiceModel.db.port, ServiceModel.db.name);
    const count = await ServiceModel.countDocuments({});
    console.log(`count: ${count}`);
    const raw = await ServiceModel.collection.findOne({}); // bypass Mongoose casting entirely
    console.log("type:", typeof raw?._id, raw?._id);
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