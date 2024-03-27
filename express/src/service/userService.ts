import { IUser} from '../repositories/UserRepository'
import {User} from '../models/User'

export interface IUserService {
  createUser(email: string, password: string, salt: string): Promise<User>
  findAll(): Promise<User[]>
  findUserByEmail(email: string): Promise<User | null>
}

export class UserService implements IUserService
{
  constructor(private userRepository: IUser) {
  }

  async createUser(email: string, password: string, salt: string): Promise<User>
  {
    const user = await this.userRepository.createUser({
      email,
      password,
      salt
    })
    return user
  }

  async findAll(): Promise<User[]>
  {
    return await this.userRepository.findAllUser()
  }

  async findUserByEmail(email: string): Promise<User | null>
  {
    if (!email.includes("@")){
      throw new Error("メールアドレスのフォーマットが正しくないです")
    }
    return await this.userRepository.findUserByEmail(email)
  }

  static builder(repository: IUser): IUserService
  {
    return new this(repository)
  }
}