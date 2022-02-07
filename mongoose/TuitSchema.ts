import mongoose from "mongoose";
import User from '../models/User'
const TuitSchema = new mongoose.Schema({
    postedBy: {type: String, required: true},
    post: {type: String, required: true},
    likes: Number,
    hashTag: String,
    bookMark: String,
    date: {type: Date, default: Date.now()},
}, {collection: 'tuits'});
export default TuitSchema;