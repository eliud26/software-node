/**
 * @file Controller RESTful Web service API for Bookmark resource
 */
import {Express, Request, Response} from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/messageController";

/**
 * @class MessageDao Implements RESTful Web service API for message resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /users/:uid/tuits/:tid to create a new bookmark instance for a given tuit</li>
 *     <li>DELETE /users/:uid/tuits/:tid to remove a particular bookmark instance</li>
 *     <li>GET /users/:uid/tuits to retrieve all the tuit bookmark instances by user</li>
 *     <li>GET /users/tuits to retrieve all of the bookmark instances</li>
 *     <li>GET /users/:uid/tuits/:tid to retrieve one bookmark instance</li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao DAO implementing follow CRUD operations
 * @property {BookmarkController} bookmarkController controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
    app: Express;
    messageDao: MessageDao
    constructor(app: Express, messageDao: MessageDao) {
        this.app = app;
        this.messageDao = messageDao;
        this.app.post("/users/:uid/message/users/:ruid", this.createMessage);
        this.app.delete("/users/:uid/message/users/:ruid", this.deleteMessage);
        this.app.get("/users/:uid/user/messages", this.findMessagesByUser);
        this.app.get("/users/:uid/messages/user", this.findMessagesToUser);
        this.app.get("/users/messages", this.findAllMessages);
        this.app.put("/users/:uid/message/users/:fuid", this.updateMessage);
    }

    /**
     * Creates a bookmark object to be sent to database collection
     * @param req represents request from client including body
     * containing the JSON object for the new bookmark to be inserted in the database
     * @param res represents response to client, including the body formatted
     * as JSON containing the new bookmark that was inserted in the database
     */
    createMessage = (req: Request, res: Response) =>
        this.messageDao.createMessage(req.params.uid, req.params.ruid, req.body)
            .then(message => res.json(message));
    /**
     * Deletes a bookmark object that contains the bookmark tuit
     * @param req re
     * @param res
     */
    deleteMessage = (req: Request, res: Response) =>
        this.messageDao.deleteMessage(req.params.uid, req.params.ruid)
            .then(status => res.json(status));
    /**
     *
     * @param req
     * @param res
     */
    findMessagesByUser = (req: Request, res: Response) =>
        this.messageDao.findMessagesByUser(req.params.uid)
            .then(follows => res.json(follows));
    /**
     *
     * @param req
     * @param res
     */
    findMessagesToUser = (req: Request, res: Response) =>
        this.messageDao.findMessagesToUser(req.params.uid)
            .then(status => res.send(status));
    /**
     *
     * @param req
     * @param res
     */
    findAllMessages = (req: Request, res: Response) =>
        this.messageDao.findAllMessages()
            .then(message => res.json(message))

    /**
     *
     * @param req
     * @param res
     */
    updateMessage = (req: Request, res: Response) =>
        this.messageDao.updateMessage(req.params.uid, req.body)
            .then(status => res.json(status))

};