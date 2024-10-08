import { MeDao, ShowUserDao } from './dto/user'

export interface IUserRepository {
  create(data: { email: string; password: string; salt: string }): Promise<ShowUserDao>
  findUserByEmail(email: string): Promise<ShowUserDao | null>
  update(data: ShowUserDao): Promise<void>
  findById(userId: number): Promise<MeDao | null>
}
