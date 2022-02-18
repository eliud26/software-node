/**
 * @file Controller RESTful Web service API for Bookmark resource
 */
import {Express, Request, Response} from "express";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/bookMarkController";

/**
 * @class BookmarkController Implements RESTful Web service API for bookmark resource.
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
export default class BookmarkController implements BookmarkControllerI {
    app: Express;
    bookmarkDao: BookmarkDao
    constructor(app: Express, bookmarkDao: BookmarkDao) {
        this.app = app;
        this.bookmarkDao = bookmarkDao;
        this.app.post("/users/:uid/bookmark/tuits/:tid", this.createBookmark);
        this.app.delete("/users/:uid/unbookmark/tuits/:tid", this.deleteBookmark);
        this.app.get("/users/:uid/bookmark/tuits", this.findBookmarkByUser);
        this.app.get("/bookmark", this.findAllBookmark);
        this.app.get("/users/:uid/bookmark/tuits/:tid", this.findOneBookmark);
    }

    /**
     * Creates a bookmark object to be sent to database collection
     * @param req represents request from client including body
     * containing the JSON object for the new bookmark to be inserted in the database
     * @param res represents response to client, including the body formatted
     * as JSON containing the new bookmark that was inserted in the database
     */
    createBookmark = (req: Request, res: Response) =>
        this.bookmarkDao.createBookmark(req.params.uid, req.params.tid)
            .then(bookmark => res.json(bookmark));
    /**
     * Deletes a bookmark object that contains the bookmark tuit
     * @param req re
     * @param res
     */
    deleteBookmark = (req: Request, res: Response) =>
        this.bookmarkDao.deleteBookmark(req.params.uid, req.params.tid)
            .then(status => res.json(status));
    /**
     *
     * @param req
     * @param res
     */
    findBookmarkByUser = (req: Request, res: Response) =>
        this.bookmarkDao.findBookmarkByUser(req.params.uid)
            .then(bookmark => res.json(bookmark));
    /**
     *
     * @param req
     * @param res
     */
    findAllBookmark = (req: Request, res: Response) =>
        this.bookmarkDao.findAllBookmark()
            .then(bookmark => res.send(bookmark));
    /**
     *
     * @param req
     * @param res
     */
    findOneBookmark = (req: Request, res: Response) =>
        this.bookmarkDao.findOneBookmark(req.params.uid, req.params.tid)
            .then(follow => res.json(follow))

};