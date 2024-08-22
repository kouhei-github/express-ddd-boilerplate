import { Request, Response } from 'express'

export interface IUserController {
  getUsers(req: Request, res: Response): Promise<void>
}

export interface IAuthController {
  signup(req: Request, res: Response): Promise<any>
  login(req: Request, res: Response): Promise<any>
  refresh(req: Request, res: Response): Promise<any>
}

export interface IHealthCheckController {
  healthCheck(req: Request, res: Response): Promise<any>
}

export interface ITaskController {
  create(req: Request, res: Response): Promise<any>
  getTask(req: Request, res: Response): Promise<any>
  update(req: Request, res: Response): Promise<any>
  list(req: Request, res: Response): Promise<any>
}

export interface IWorkSpaceController {
  create(req: Request, res: Response): Promise<any>
}
