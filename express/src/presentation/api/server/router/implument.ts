import {Request, Response} from "express";

export interface IUserController {
    getUsers(req: Request, res: Response): Promise<void>
    signup(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>
    login(req: Request, res: Response): Promise<any>
}