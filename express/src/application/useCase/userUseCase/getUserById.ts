import { pick } from 'lodash'
import { IUserRepository } from '../../../domain/interface/repositories/userRepository'
import { IGetUserUseCase } from '../impluments/user'
import { IResponse } from '../index'

export class GetUserUseCase implements IGetUserUseCase {
  constructor(private ur: IUserRepository) {}

  public async execute(userId: number): Promise<IResponse> {
    const user = await this.ur.findById(userId)
    return {
      data: pick(user, ['id', 'name', 'profilePicture', 'status', 'language', 'timezone']),
      status: 200,
    }
  }

  static builder(ur: IUserRepository): IGetUserUseCase {
    return new this(ur)
  }
}
