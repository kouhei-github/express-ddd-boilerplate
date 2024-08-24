import { pick } from 'lodash'
import { IUserRepository } from '../../../domain/interface/repositories/userRepository'
import { IGetUserUseCase } from '../impluments/user'
import { IResponse } from '../index'

export class GetUserUseCase implements IGetUserUseCase {
  constructor(private ur: IUserRepository) {}

  public async execute(userId: number): Promise<IResponse> {
    try {
      // Userの取得
      const user = await this.ur.findById(userId)

      return {
        data: pick(user, ['id', 'name', 'profilePicture', 'status', 'language', 'timezone']),
        status: 200,
        message: '取得できました',
      }
    } catch (e) {
      return {
        data: `${e}`,
        status: 400,
        message: `${e}`,
      }
    }
  }

  static builder(ur: IUserRepository): IGetUserUseCase {
    return new this(ur)
  }
}
