import {User} from '../models/User'

export type CustomPick<P, K extends keyof P> = {
  [O in K]: P[O]
}

export interface IUser {
  createUser(data: CustomPick<User, "email"|"password"|"salt">): Promise<User>
  findUserByEmail(email: string): Promise<User | null>
  findAllUser(): Promise<User[]>
}

export class UserRepository implements IUser {
  async createUser(data: CustomPick<User, "email"|"password"|"salt">): Promise<User>
  {
    return await User.create(data)
  }

  async findUserByEmail(email: string): Promise<User | null>
  {
    return await User.findOne({ where: { email: email }, attributes: { exclude: ['password', 'salt', 'sessionToken'] }})
  }

  async findAllUser(): Promise<User[]>
  {
    return await User.findAll()
  }

  static builder(): IUser
  {
    return new this()
  }
}