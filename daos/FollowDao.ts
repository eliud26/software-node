import FollowDaoI from "../interfaces/FollowDao";
import FollowModel from "../mongoose/FollowModel";
import Follow from "../models/Follow";

export default class FollowDao implements FollowDaoI {
    createFollow = async (uid: string, following: string): Promise<Follow> =>
        FollowModel.create({user: uid, following: following});

    deleteFollow =  async (uid: string, follow: string): Promise<any> =>
        FollowModel.deleteOne({user: uid, following: follow});

    findAllFollow = async (): Promise<Follow[]> =>
        FollowModel.find()
           .populate("following")
           .exec();

    findAllUsersFollowingThisUser = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({user: uid})
            .populate("following")
            .exec();

    findAllUsersThisUserFollows = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({following: uid})
            .populate("user")
            .exec();

    findOneFollow = async (uid: string, follow: string): Promise<any> =>
        FollowModel.findOne({user: uid, following: follow})
            .populate("user")
            .populate("following")
            .exec();

}

