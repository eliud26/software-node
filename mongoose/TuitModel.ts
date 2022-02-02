import mongoose from "mongoose";
import TuitSchema from "./UserSchema";
const TuitModel = mongoose.model('UserModel', TuitSchema);
export default TuitModel;