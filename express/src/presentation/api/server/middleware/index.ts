import {NextFunction, Request, Response} from 'express'
import {get, merge} from 'lodash'
import {UserDto} from "../../../../infrastructure/datastore/dto/user";
import {IUserRepository} from "../../../../domain/interface/repositories/userRepositoryInterface";

interface IServerMiddleware {
  isOwnerHandler(req: Request, res: Response, next: NextFunction):  Promise<void | Response<any, Record<string, any>>>
  isAuthenticatedHandler(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>
}

export class ServerMiddleware implements IServerMiddleware{
  constructor(private ur: IUserRepository) {
  }
  async isOwnerHandler(req: Request, res: Response, next: NextFunction):  Promise<void | Response<any, Record<string, any>>>
  {
    try{
      const { userId } = req.params
      const currentUserId: UserDto = get(req, "identity", {} as UserDto)

      if(!currentUserId.id){
        return res.status(400).json({message: "userid is not equal"}).end()
      }

      if(currentUserId.id.toString() !== userId){
        const message = "Failed Authenticated"
        return res.status(403).json({message}).end()
      }

      return next()
    } catch (error) {
      return res.status(400).json({message: error}).end()
    }
  }

  async isAuthenticatedHandler(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>
  {
    try{
      const sessionToken = req.cookies["RULE-THE-FATE-AUTH"]
      if(!sessionToken){
        return res.status(400).json({message: "session token is nothing"}).end()
      }

      const existingUser = await this.ur.findBySessionToken(sessionToken)

      if (!existingUser){
        const message = "Failed Authenticated"
        return res.status(403).json({message}).end()
      }

      merge(req, { identity: existingUser })

      return next()
    } catch (error) {
      return res.status(400).json({message: error}).end()
    }
  }

  static builder(userRepository: IUserRepository): IServerMiddleware
  {
    return new this(userRepository)
  }
}
