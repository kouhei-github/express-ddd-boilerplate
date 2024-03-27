import {Request, Response} from 'express'
import {IUser} from '../repositories/UserRepository'

export interface IHelloWorldService {
  helloMessage(email: string): Promise<string>
  getUserById(userId: number): Promise<string>
}

export class HelloWorldService implements IHelloWorldService
{
  constructor(private userRepository: IUser) {
  }
  async helloMessage(email: string): Promise<string>
  {
    const user = await this.userRepository.findUserByEmail(email)
    if (user === null) throw new Error("ユーザーが存在しません")
    return user.userName.toUpperCase()
  }

  async getUserById(userId: number): Promise<string>
  {
    return "name"
  }

  static builder(repository: IUser): IHelloWorldService
  {
    return new this(repository)
  }
}