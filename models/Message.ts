import User from "./User";

export default interface Message {
    message: String,
    sender: User,
    receiver: User
};