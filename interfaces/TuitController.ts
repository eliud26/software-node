import {Request, Response} from "express";

export default interface TuitController {
    findAllTuits(req: Request, res: Response): void;
    findTuitById(req: Request, res: Response): void;
    findTuitsByUser(req: Request, res: Response): void;
    createTuit(req: Request, res: Response): void;
    updateTuit(req: Request, res: Response): void;
    deleteTuit(req: Request, res: Response): void;
    deleteTuitByUsernameAndTuit(req: Request, res: Response): void;
    deleteAllTuits(req: Request, res: Response): void;
}
