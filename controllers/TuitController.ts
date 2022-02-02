// import TuitDao from "../daos/TuitDao";
// import Tuit from "../models/Tuit";
// import {Express, Request, Response} from "express";
// import TuitControllerI from "../interfaces/TuitController";
//
// export default class TuitController implements TuitControllerI {
//     private static tuitDao: TuitDao = TuitDao.getInstance();
//     private static tuitController: TuitController | null = null;
//     public static getInstance = (app: Express): TuitController => {
//         if(TuitController.tuitController === null) {
//             TuitController.tuitController = new TuitController();
//             app.get("/tuits", TuitController.tuitController.findAllTuits);
//             app.get("/users/:uid/tuits", TuitController.tuitController.findTuitsByUser);
//             app.get("/tuits/:uid", TuitController.tuitController.findTuitById);
//             app.post("/tuits", TuitController.tuitController.createTuit);
//             app.put("/tuits/:uid", TuitController.tuitController.updateTuit);
//             app.delete("/tuits/:uid", TuitController.tuitController.deleteTuit);
//         }
//         return TuitController.tuitController;
//     }
//
//     private constructor() {}
//
//     findAllTuits = (req: Request, res: Response) =>
//         TuitController.tuitDao.findAllTuits()
//             .then((tuits: Tuit[]) => res.json(tuits));
//     findTuitsByUser = (req: Request, res: Response) =>
//         TuitController.tuitDao.findTuitsByUser(req.params.uid)
//             .then((tuits: Tuit[]) => res.json(tuits));
//     findTuitById = (req: Request, res: Response) =>
//         TuitController.tuitDao.findTuitById(req.params.uid)
//             .then((tuit: Tuit) => res.json(tuit));
//     createTuit = (req: Request, res: Response) =>
//         TuitController.tuitDao.createTuit(req.body)
//             .then((tuit: Tuit) => res.json(tuit));
//     updateTuit = (req: Request, res: Response) =>
//         TuitController.tuitDao.updateTuit(req.params.uid, req.body)
//             .then((status) => res.send(status));
//     deleteTuit = (req: Request, res: Response) =>
//         TuitController.tuitDao.deleteTuit(req.params.uid)
//             .then((status) => res.send(status));
// };

import {Request, Response, Express} from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";
import Tuit from '../models/Tuit';

export default class TuitController implements TuitControllerI {
    app: Express;
    tuitDao: TuitDao;
    constructor(app: Express, tuitDao: TuitDao) {
        this.app = app;
        this.tuitDao = tuitDao;
        this.app.get('/tuits', this.findAllTuits);
        this.app.get('/tuits/:tid', this.findTuitById);
        this.app.post('/tuits', this.createTuit);
        this.app.delete('/tuits/:tid', this.deleteTuit);
        this.app.put('/tuits/:tid', this.updateTuit);
    }
    findAllTuits = (req: Request, res: Response) =>
        this.tuitDao.findAllTuits()
            .then((tuits: Tuit[])=> res.json(tuits));
    findTuitById = (req: Request, res: Response) =>
        this.tuitDao.findTuitById(req.params.tid)
            .then((tuit: Tuit) => res.json(tuit));
    createTuit = (req: Request, res: Response) =>
        this.tuitDao.createTuit(req.body)
            .then((tuit: Tuit) => res.json(tuit));
    deleteTuit = (req: Request, res: Response) =>
        this.tuitDao.deleteTuit(req.params.userid)
            .then((status: any) => res.json(status));
    updateTuit = (req: Request, res: Response) =>
        this.tuitDao.updateTuit(req.params.userid, req.body)
            .then((status: any) => res.json(status));
    findTuitsByUser = (req: Request, res: Response) =>
        this.tuitDao.findTuitsByUser(req.params.tid)
            .then((tuit: Tuit[]) => res.json(tuit));
}