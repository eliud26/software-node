
import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";

export default class TuitDao implements TuitDaoI {
    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find();
    }
    async findTuitById(tid: string): Promise<any> {
        return await TuitModel.findById(tid);
    }
    async createTuit(tid: Tuit): Promise<any> {
        return await TuitModel.create(tid);
    }
    async deleteTuit(tid: string):  Promise<any> {
        return await TuitModel.deleteOne({_id: tid});
    }
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return await TuitModel.updateOne({_id: tid}, {$set: tuit});
    }

    async findTuitsByUser(tid: string): Promise<Tuit[]> {
        return await TuitModel.find({_id: tid });
    }
}