import mongoose, {Schema} from "mongoose";
import Like from "../models/Dislike";

const DisLikeSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    dislikedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "dislikes"});
export default DisLikeSchema;