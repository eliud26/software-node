import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";

export default class TuitDao implements TuitDaoI {
    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find()
            .sort({'postedOn': -1})
            .populate("postedBy")
            .exec();
    }
    async findTuitById(tid: string): Promise<any> {
        return await TuitModel.findById(tid)
            .sort({'postedOn': -1})
            .populate("postedBy")
            .exec();
    }
    async createTuit(tid: Tuit, uid: string): Promise<any> {
        return await TuitModel.create({...tid, postedBy: uid});
    }
    async deleteTuit(tid: string):  Promise<any> {
        return await TuitModel.deleteOne({_id: tid});
    }
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return await TuitModel.updateOne({_id: tid}, {$set: tuit});
    }

    async findAllTuitsByUser(uid: string): Promise<Tuit[]> {
        return await TuitModel.find({postedBy: uid })
            .sort({'postedOn': -1})
            .populate("postedBy")
            .exec();
    }

    async deleteTuitByUsernameAndTuit(username: string, tuit: string): Promise<any> {
        return await TuitModel.deleteOne({postedBy: username, tuit: tuit });
    }
    async deleteAllTuits():  Promise<any> {
        return await TuitModel.deleteMany({});
    }
    async updateLikes(tid: string, newStats: Tuit): Promise<any> {
        return await TuitModel.updateOne({_id: tid}, {$set: {stats: newStats}});
    }

}