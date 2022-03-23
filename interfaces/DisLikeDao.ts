import Like from "../models/Like";

/**
 * @file Declares API for DisLikes related data access object methods
 */
export default interface DisLikeDaoI {
    findAllUsersThatDisLikedTuit (tid: string): Promise<Like[]>;
    findAllTuitsDisLikedByUser (uid: string): Promise<Like[]>;
    findUserDisLikesTuit(uid: string, tid: string): Promise<Like>;
    countHowManyUnLikedTuit(tid: string): Promise<any>;
    userUnlikesTuit (tid: string, uid: string): Promise<any>;
};