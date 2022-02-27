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
        this.app.get('/users/:tid/tuits', this.findTuitsByUser);
        this.app.post('/users/:uid/tuits', this.createTuit);
        this.app.delete('/tuits/:tid', this.deleteTuit);
        this.app.put('/tuits/:tid', this.updateTuit);

        //for testing purposes
        this.app.delete('/tuits/delete', this.deleteTuitByUsernameAndTuit);
        this.app.delete('tuits/delete/all', this.deleteAllTuits);

    }
    findAllTuits = (req: Request, res: Response) =>
        this.tuitDao.findAllTuits()
            .then((tuits: Tuit[])=> res.json(tuits));
    findTuitById = (req: Request, res: Response) =>
        this.tuitDao.findTuitById(req.params.tid)
            .then((tuit: Tuit) => res.json(tuit));
    createTuit = (req: Request, res: Response) =>
        this.tuitDao.createTuit(req.body, req.params.uid)
            .then((tuit: Tuit) => res.json(tuit));
    deleteTuit = (req: Request, res: Response) =>
        this.tuitDao.deleteTuit(req.params.tid)
            .then((status: any) => res.json(status));
    updateTuit = (req: Request, res: Response) =>
        this.tuitDao.updateTuit(req.params.tid, req.body)
            .then((status: any) => res.json(status));
    findTuitsByUser = (req: Request, res: Response) =>
        this.tuitDao.findTuitsByUser(req.params.tid)
            .then((tuit: Tuit[]) => res.json(tuit));

    //for testing purposes
    deleteTuitByUsernameAndTuit = (req: Request, res: Response) =>
        this.tuitDao.deleteTuitByUsernameAndTuit(req.body.username, req.body.tuit)
            .then((status: any) => res.json(status));
    deleteAllTuits = (req: Request, res: Response) =>
        this.tuitDao.deleteAllTuits()
        .then((status)=> res.send(status));
}