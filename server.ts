import express, {NextFunction, Request, Response} from 'express';
import UserController from './controllers/UserController';
import TuitController from './controllers/TuitController';
import UserDao from './daos/UserDao';
import TuitDao from './daos/TuitDao';
import mongoose from "mongoose";
import bodyParser from "body-parser";
const app = express();
const router = app._router();

mongoose.connect('mongodb://localhost:27017/tuiter')
app.use(bodyParser.json())

app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

// UserController.getInstance(app);
// TuitController.getInstance(app);

const userDao = new UserDao();
const tuitDao = new TuitDao();
const userController = new UserController(app, userDao);
const tuitController = new TuitController(app, tuitDao);

// app.get('/users', (req: Request, res: Response) =>
// res.send(userController));
// app.get('/tuits', (req: Request, res: Response) =>
//     res.send(tuitController));

// app.use('/users', userController);
// app.use('/tuits', tuitController);

router.route('/users').get(userController.app.bind(userController));
// app.route('/tuits')
//     .get((req: Request, res: Response) =>
//         res.send(tuitController))

// router.use((req: Request, res: Response, next: NextFunction) =>
// userController);
// router.get('/users')

const PORT = 4000;
app.listen(process.env.PORT || PORT);