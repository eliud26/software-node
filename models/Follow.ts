import User from "../models/User";

export default interface Follow {
    user: User,
    following: User
}