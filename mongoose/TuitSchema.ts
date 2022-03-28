import mongoose, {Schema} from "mongoose";
import Tuit from "../models/Tuit";
const TuitSchema = new mongoose.Schema<Tuit>({
    postedBy: {type: Schema.Types.ObjectId, required: true, ref: "UserModel"},
    tuit: {type: String, required: true},
    postedOn: {type: Date, default: Date.now()},
    stats: {
        replies: {type: Number, default: 0},
        retuits: {type: Number, default: 0},
        likes: {type: Number, default: 0},
        dislikes: {type: Number, default: 0},
        likeByFlag: Boolean,
        dislikeByFlag: Boolean
    }
}, {collection: 'tuits'});
export default TuitSchema;