import Tuit from "../models/Tuit";

export default interface TuitDao {
    findAllTuits(): Promise<Tuit[]>;
    findTuitsByUser(uid: string): Promise<Tuit[]>;
    findTuitById(tid: string): Promise<Tuit>;
    createTuit(tuit: Tuit, uid: string): Promise<Tuit>;
    updateTuit(tid: string, tuit: Tuit): Promise<any>;
    deleteTuit(tid: string): Promise<any>;

    //for testing purposes
    deleteTuitByUsernameAndTuit(username: string, tuit: string): Promise<any>;
    deleteAllTuits(): Promise<any>;

}
