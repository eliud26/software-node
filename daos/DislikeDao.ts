// import DisLikeDaoI from "../interfaces/DisLikeDao";
// import DisLikeModel from "../mongoose/DisLikeModel";
// import Like from "../models/Like";
//
// export default class DislikeDao implements DisLikeDaoI {
//     countHowManyUnLikedTuit = async (tid: string) =>
//             DisLikeModel.count({tuit: tid});
//
//     findAllTuitsDisLikedByUser = async (tid: string): Promise<Like[]> => {
//         DisLikeModel.find({tuit: tid})
//             .populate("dislikeby")
//             .exec();
//     }
//
//     findAllUsersThatDisLikedTuit = async (tid: string): Promise<Like[]> => {
//         DisLikeModel
//             .find({dislikedBy: tid})
//             .populate("tuit")
//             .exec();
//     }
//
//     findUserDisLikesTuit = async (uid: string, tid: string): Promise<any> =>
//     DisLikeModel.findOne(
//         {tuit: tid, likedBy: uid});
//
//     userUnlikesTuit(tid: string, uid: string): Promise<any> {
//         return Promise.resolve(undefined);
//     }
//
// }