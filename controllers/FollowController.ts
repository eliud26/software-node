/**
 * @file Controller RESTful Web service API for Follow resource
 */
import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/followController";

/**
 * @class FollowController Implements RESTful Web service API for follow resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /users/:uid/follow/users/:uid to create a new follow instance for a given user</li>
 *     <li>DELETE /users/:uid/unfollow/users/:uid to remove a particular tuit instance</li>
 *     <li>GET /users/follow to retrieve all the tuit instances</li>
 *     <li>GET /users/:uid/followers to retrieve all of the followers of a particular user</li>
 *     <li>GET /users/:uid/following to retrieve all users this user is following</li>
 *     <li>GET /users/:uid/follow/users/:uid to retrieve on particular follower</li>
 * </ul>
 * @property {FollowDao} followDao DAO implementing follow CRUD operations
 * @property {FollowController} followController controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    app: Express;
    followDao: FollowDao
    constructor(app: Express, followDao: FollowDao) {
        this.app = app;
        this.followDao = followDao;
        this.app.post("/users/:uid/follow/users/:fuid", this.createFollow);
        this.app.delete("/users/:uid/unfollows/user/:fuid", this.deleteFollow);
        this.app.get("/follows", this.findAllFollow);
        this.app.get("/users/:uid/followers", this.findAllUsersFollowingThisUser);
        this.app.get("/users/:uid/following", this.findAllUsersThisUserFollows);
        this.app.get("/users/:uid/follow/users/:fuid", this.findOneFollow);
    }

    /**
     * Creates a follow object to be sent to database collection
     * @param req represents request from clien including body
     * containing the JSON object for the new follow to be inserted in the database
     * @param res represents response to client, including the body formatted
     * as JSON containing the new follow that was inserted in the database
     */
    createFollow = (req: Request, res: Response) =>
        this.followDao.createFollow(req.params.uid, req.params.fuid)
            .then(follows => res.json(follows));
    /**
     * Deletes a follow object that contains the follower, following relation between two users
     * @param req re
     * @param res
     */
    deleteFollow = (req: Request, res: Response) =>
        this.followDao.deleteFollow(req.params.uid, req.params.fuid)
            .then(status => res.json(status));
    /**
     *
     * @param req
     * @param res
     */
    findAllFollow = (req: Request, res: Response) =>
        this.followDao.findAllFollow()
            .then(follows => res.json(follows));
    /**
     *
     * @param req
     * @param res
     */
    findAllUsersFollowingThisUser = (req: Request, res: Response) =>
        this.followDao.findAllUsersFollowingThisUser(req.params.uid)
            .then(follow => res.send(follow));
    /**
     *
     * @param req
     * @param res
     */
    findAllUsersThisUserFollows = (req: Request, res: Response) =>
        this.followDao.findAllUsersThisUserFollows(req.params.uid)
            .then(follow => res.json(follow))
    /**
     *
     * @param req
     * @param res
     */
    findOneFollow = (req: Request, res: Response) =>
        this.followDao.findOneFollow(req.params.uid, req.params.fuid)
            .then(follow => res.json(follow))
};