import {Request, Response} from 'express'
import {IUserService} from '../service/userService'
import {ISecurityService} from '../service/SecurityService'
import {User} from '../models/User'


export interface IUserController {
  getUsers(req: Request, res: Response): Promise<void>
  saveUser(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>
}

export class UserController implements IUserController {
  constructor(private userService: IUserService, private securityService: ISecurityService) {
  }

  async saveUser(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>
  {
    const {email, password} = req.body as {email: string, password: string}
    let exist: User | null
    try {
      exist = await this.userService.findUserByEmail(email)
    } catch (e) {
      console.log(e)
      return res.status(409).json({ message: "UserRepository already exists" });
    }

    if (exist !== null){
      return res.status(409).json({ message: "UserRepository already exists" });
    }

    // パスワードのソルト
    const salt = this.securityService.random()
    const hashPassword = this.securityService.authentication(salt, password)

    // 保存
    const user = await this.userService.createUser(email, hashPassword, salt)
    res.json(user);
  }

  async getUsers(req: Request, res: Response)
  {
    const users = await this.userService.findAll()
    res.json(users)
  }

  static builder(userService: IUserService, securityService: ISecurityService)
  {
    return new this(userService, securityService)
  }
}