import User from "./User";

export default interface Message {
    message: string,
    sender: User,
    receiver: User,
    sentOn?: Date
};