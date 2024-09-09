import { ShowUserAuthSchema } from './dto/user'

export interface IUserAuthRepository {
  update(input: ShowUserAuthSchema): Promise<void>
}
