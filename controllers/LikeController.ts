import {Express, Request, Response} from "express";
import LikeDao from "../daos/LikeDao";
import LikeControllerI from "../interfaces/LikeController";
import TuitDao from "../daos/TuitDao";

export default class LikeController implements LikeControllerI {
    app: Express;
    likeDao: LikeDao;
    tuitDao: TuitDao;
    constructor(app: Express, likeDao: LikeDao, tuitDao: TuitDao) {
        this.app = app;
        this.likeDao = likeDao;
        this.tuitDao = tuitDao;
        this.app.get("/api/users/:uid/likes", this.findAllTuitsLikedByUser);
        this.app.get("/api/tuits/:tid/likes", this.findAllUsersThatLikedTuit);
        this.app.post("/api/users/:uid/likes/:tid", this.userLikesTuit);
        this.app.delete("/api/users/:uid/unlikes/:tid", this.userUnlikesTuit);
        this.app.put("/api/users/:uid/likes/:tid", this.userTogglesTuitLikes);
    }

    findAllUsersThatLikedTuit = (req: Request, res: Response) =>
        this.likeDao.findAllUsersThatLikedTuit(req.params.tid)
            .then(likes => res.json(likes));
    findAllTuitsLikedByUser = (req: Request, res: Response) =>
        this.likeDao.findAllTuitsLikedByUser(req.params.uid)
            .then(likes => res.json(likes));
    userLikesTuit = (req: Request, res: Response) =>
        this.likeDao.userLikesTuit(req.params.uid, req.params.tid)
            .then(likes => res.json(likes));
    userUnlikesTuit = (req: Request, res: Response) =>
        this.likeDao.userUnlikesTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));

    userTogglesTuitLikes = async (req: any, res: any) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        try {
            const userAlreadyLikedTuit = await this.likeDao
                .findUserLikesTuit(userId, tid);
            const howManyLikedTuit = await this.likeDao
                .countHowManyLikedTuit(tid);
            const howManyUnlikedTuit = await this.likeDao
                .countHowManyUnLikedTuit(tid);
            let tuit = await this.tuitDao.findTuitById(tid);
            if (userAlreadyLikedTuit) {
                await this.likeDao.userUnlikesTuit(userId, tid);
                tuit.stats.likes = howManyLikedTuit - 1;
                tuit.stats.unlikes = howManyUnlikedTuit + 1;
            } else {
                await this.likeDao.userLikesTuit(userId, tid);
                tuit.stats.likes = howManyLikedTuit + 1;
                tuit.stats.unlikes = howManyUnlikedTuit - 1;
            };
            await this.tuitDao.updateLikes(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    }

};