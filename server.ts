/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>follow</li>
 *     <li>bookmark</li>
 *     <li>message</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */

import express, {Request, Response} from 'express';
import UserController from './controllers/UserController';
import TuitController from './controllers/TuitController';
import FollowController from './controllers/FollowController';
import MessageController from './controllers/MessageController';
import BookmarkController from './controllers/BookmarkController';
import UserDao from './daos/UserDao';
import TuitDao from './daos/TuitDao';
import FollowDao from './daos/FollowDao';
import MessageDao from './daos/MessageDao';
import BookmarkDao from './daos/BookmarkDao';
import mongoose from "mongoose";
import LikeController from "./controllers/LikeController";
import LikeDao from "./daos/LikeDao";
import AuthenticationController from "./controllers/authController";
const cors = require('cors');
const session = require("express-session");

const PROTOCOL = "mongodb+srv";
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const HOST = "cluster0.m8jeh.mongodb.net";
const DB_NAME = "myFirstDatabase";
const DB_QUERY = "retryWrites=true&w=majority";
const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;
const connection = "mongodb+srv://software-engineering:softwareSpring2022@cluster0.exbec.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(connection);
//const LOCAL = 'mongodb://localhost:27017/tuiter';
const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'https://software-node-spring22.herokuapp.com'
}));

const SECRET = 'process.env.SECRET';
let sess =  {
    secret: SECRET,
    saveUninitialized: true,
    resave: true,
    cookie : {
        secure: false
    }
}
if(process.env.ENV === 'PRODUCTION') {
    app.set('trust proxy', 1)
    sess.cookie.secure = true
}

app.use(session(sess))

app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

const userDao = new UserDao();
const tuitDao = new TuitDao();
const followDao =  new FollowDao();
const messageDao =  new MessageDao();
const bookmarkDao =  new BookmarkDao();
const likeDao = new LikeDao();
const userController = new UserController(app, userDao);
const tuitController = new TuitController(app, tuitDao);
const followController = new FollowController(app, followDao);
const messageController = new MessageController(app, messageDao);
const bookmarkController = new BookmarkController(app, bookmarkDao);
const likeController = new LikeController(app, likeDao, tuitDao)
const authController = new AuthenticationController(app, userDao);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);