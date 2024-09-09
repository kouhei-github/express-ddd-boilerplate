import { PrismaClient } from '@prisma/client'
import { ShowUserDao } from '../../../domain/interface/repositories/dto/user'
import { IUserAuthRepository } from '../../../domain/interface/repositories/userAuthRepository'

export class UserAuthRepository implements IUserAuthRepository {
  constructor(private readonly prisma: PrismaClient) {}
  public async update(input: Pick<ShowUserDao, 'userAuth'>['userAuth']): Promise<void> {
    const { id, ...update } = input
    await this.prisma.userAuth.update({
      where: { id: id },
      data: {
        ...update,
      },
    })
  }

  static builder(db: PrismaClient): IUserAuthRepository {
    return new this(db)
  }
}
