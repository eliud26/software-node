import mongoose, {Schema} from "mongoose";
import Message from "../models/Message"

const MessageSchema = new mongoose.Schema<Message>({
    message: {type: String, required: true},
    sender: {type: Schema.Types.ObjectId, ref: "UserModel"},
    receiver: {type: Schema.Types.ObjectId, ref: "UserModel"}
}, {collection: "message"})
export default MessageSchema;