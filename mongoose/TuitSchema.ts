import mongoose, {Schema} from "mongoose";
import Tuit from "../models/Tuit";
const TuitSchema = new mongoose.Schema<Tuit>({
    postedBy: {type: String, required: true},
    tuit: {type: String, required: true},
    postedOn: {type: Date, default: Date.now()},
    stats: {
        replies: {type: Number, default: 0},
        retuits: {type: Number, default: 0},
        likes: {type: Number, default: 0},
        unlikes: {type: Number, default: 0}
    }
}, {collection: 'tuits'});
export default TuitSchema;