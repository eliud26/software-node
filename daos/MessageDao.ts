/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDao";
import MessageModel from "../mongoose/MessageModel";
import Message from "../models/Message";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} MessageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    createMessage = async (uid: string, ruid: string, message: Message): Promise<Message> =>
        MessageModel.create({sender: uid, receiver: ruid, message: message});

    deleteMessage =  async (uid: string, ruid: string): Promise<any> =>
        MessageModel.deleteOne({sender: uid, receiver: ruid});

    findMessagesByUser = async (uid: string): Promise<Message[]> =>
        MessageModel.find({sender: uid})
            .populate("receiver")
            .exec();

    findMessagesToUser = async (uid: string): Promise<Message[]> =>
        MessageModel.find({receiver: uid})
            .populate("sender")
            .exec();

    updateMessage = async (uid: string, message: Message): Promise<any> =>
        MessageModel.updateOne({sender: uid}, {$set: message});


    findAllMessages = async (): Promise<Message[]> =>
        MessageModel.find();

}

