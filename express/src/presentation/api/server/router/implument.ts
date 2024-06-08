import {Request, Response} from "express";

export interface IUserController {
    getUsers(req: Request, res: Response): Promise<void>
    saveUser(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>
}