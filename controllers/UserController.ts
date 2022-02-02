// import UserDao from "../daos/UserDao";
// import User from "../models/User";
// import {Express, Request, Response} from "express";
// import UserControllerI from "../interfaces/UserController";
//
// export default class UserController implements UserControllerI {
//     private static userDao: UserDao = UserDao.getInstance();
//     private static userController: UserController | null = null;
//     public static getInstance = (app: Express): UserController => {
//         if(UserController.userController === null) {
//             UserController.userController = new UserController();
//             app.get("/users", UserController.userController.findAllUsers);
//             app.get("/users/:uid", UserController.userController.findUserById);
//             app.post("/users", UserController.userController.createUser);
//             app.put("/users/:uid", UserController.userController.updateUser);
//             app.delete("/users/:uid", UserController.userController.deleteUser);
//         }
//         return UserController.userController;
//     }
//
//     private constructor() {}
//
//     findAllUsers = (req: Request, res: Response) =>
//         UserController.userDao.findAllUsers()
//             .then((users: User[]) => res.json(users));
//     findUserById = (req: Request, res: Response) =>
//         UserController.userDao.findUserById(req.params.uid)
//             .then((user: User) => res.json(user));
//     createUser = (req: Request, res: Response) =>
//         UserController.userDao.createUser(req.body)
//             .then((user: User) => res.json(user));
//     updateUser = (req: Request, res: Response) =>
//         UserController.userDao.updateUser(req.params.uid, req.body)
//             .then((status) => res.send(status));
//     deleteUser = (req: Request, res: Response) =>
//         UserController.userDao.deleteUser(req.params.uid)
//             .then((status) => res.send(status));
// };

import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserController";

export default class UserController implements UserControllerI {
    app: Express;
    userDao: UserDao;
    constructor(app: Express, userDao: UserDao) {
        this.app = app;
        this.userDao = userDao;
        this.app.get('/users', this.findAllUsers);
        this.app.get('/users/:userid', this.findUserById);
        this.app.post('/users', this.createUser);
        this.app.delete('/users/:userid', this.deleteUser);
        this.app.put('/users/:userid', this.updateUser);
    }
    findAllUsers = (req: Request, res: Response) =>
        this.userDao.findAllUsers()
            .then(users => res.json(users));
    findUserById = (req: Request, res: Response) =>
        this.userDao.findUserById(req.params.userid)
            .then(user => res.json(user));
    createUser = (req: Request, res: Response) =>
        this.userDao.createUser(req.body)
            .then(user => res.json(user));
    deleteUser = (req: Request, res: Response) =>
        this.userDao.deleteUser(req.params.userid)
            .then(status => res.json(status));
    updateUser = (req: Request, res: Response) =>
        this.userDao.updateUser(req.params.userid, req.body)
            .then(status => res.json(status));
}
