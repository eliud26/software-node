import express, {Request, Response} from 'express';
import UserController from './controllers/UserController';
import TuitController from './controllers/TuitController';
import UserDao from './daos/UserDao';
import TuitDao from './daos/TuitDao';
import mongoose from "mongoose";
import bodyParser from "body-parser";
const app = express();

mongoose.connect('mongodb+srv://software-engineering:softwareSpring2022@cluster0.exbec.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
app.use(bodyParser.json())

app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

const userDao = new UserDao();
const tuitDao = new TuitDao();
const userController = new UserController(app, userDao);
const tuitController = new TuitController(app, tuitDao);

const PORT = 4000;
app.listen(process.env.PORT || PORT);