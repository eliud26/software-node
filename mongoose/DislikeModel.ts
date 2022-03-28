import mongoose from "mongoose";
import DisLikeSchema from "./DisLikeSchema";
const DisLikeModel = mongoose.model('DisLikeModel', DisLikeSchema);
export default DisLikeModel;