import {IUserRepository} from "../../../domain/repositories/userRepositoryInterface";
import {User} from "../models/User";
import {UserDto} from "../dto/user";


export class UserRepository implements IUserRepository {
  async createUser(data: Pick<UserDto, "email"|"password"|"salt">): Promise<UserDto>
  {
    return await User.create(data)
  }

  async findUserByEmail(email: string): Promise<UserDto | null>
  {
    return await User.findOne({ where: { email: email }, attributes: { exclude: ['password', 'salt', 'sessionToken'] }})
  }

  async findAllUser(): Promise<UserDto[]>
  {
    return await User.findAll()
  }

  async findBySessionToken(token: string): Promise<UserDto|null>
  {
    return await User.findOne({ where: { sessionToken: token }, attributes: { exclude: ['password', 'salt', 'sessionToken'] }})
  }

  static builder(): IUserRepository
  {
    return new this()
  }
}