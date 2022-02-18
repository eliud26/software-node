import Message from "../models/Message"

/**
 * @file declares API for Message related data access object methods.
 */
export default interface MessageDao {
    createMessage(uid: string, suid: string, message: Message): Promise<Message>;
    findMessagesByUser(uid: string): Promise<Message[]>;
    findMessagesToUser(tid: string): Promise<Message[]>;
    deleteMessage(uid: string, ruid: string): Promise<any>;
    updateMessage(uid: string, ruid: string, message: Message): Promise<any>;
    findAllMessages(): Promise<Message[]>;
}
