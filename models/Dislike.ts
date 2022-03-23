import Tuit from "../models/Tuit";
import User from "../models/User";

export default interface Like {
    tuit: Tuit,
    dislikedBy: User
};