// import Tuit from "../models/Tuit";
// import TuitDaoI from "../interfaces/TuitDao";
// import TuitModel from '../mongoose/TuitModel'
//
// export default class TuitDao implements TuitDaoI {
//     private static tuitDao: TuitDao | null = null;
//     public static getInstance = (): TuitDao => {
//         if(TuitDao.tuitDao === null) {
//             TuitDao.tuitDao = new TuitDao();
//         }
//         return TuitDao.tuitDao;
//     }
//     private constructor() {}
//     findAllTuits = async (): Promise<Tuit[]> =>
//         TuitModel.find();
//     findTuitsByUser = async (uid: string): Promise<Tuit[]> =>
//         TuitModel.find({_id: uid});
//     findTuitById = async (tid: string): Promise<Tuit> =>
//         TuitModel.findById(tid).populate("postedBy").exec();
//     createTuit = async (tuit: Tuit): Promise<Tuit> =>
//         TuitModel.create(tuit);
//     updateTuit = async (tid: string, tuit: Tuit): Promise<any> =>
//         TuitModel.updateOne({_id: tid}, {$set: Tuit});
//     deleteTuit = async (tid: string): Promise<any> =>
//         TuitModel.deleteOne({_id: tid});
//
// }

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
        return await TuitModel.find({_id: tid});
    }
}