import { PrismaClient } from '@prisma/client'
import { MeDao, meSchema, ShowUserDao, showUserDaoSchema } from '../../../domain/interface/repositories/dto/user'
import { IUserRepository } from '../../../domain/interface/repositories/userRepository'

export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async create(data: { email: string; password: string; salt: string }): Promise<ShowUserDao> {
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        userAuth: {
          create: {
            passwordHash: data.password,
            passwordSalt: data.salt,
          },
        },
      },
      include: { userAuth: true },
    })
    return showUserDaoSchema.parse(user)
  }

  async findUserByEmail(email: string): Promise<ShowUserDao | null> {
    const user = await this.prisma.user.findFirst({
      where: { email },
      include: { userAuth: true },
    })
    if (!user) {
      return null
    }
    const users = showUserDaoSchema.parse(user)
    return users
  }

  async update(data: ShowUserDao): Promise<void> {
    const { userAuth, ...userData } = data
    this.prisma.$transaction(async (prisma) => {
      await prisma.user.update({
        where: { id: data.id },
        data: {
          ...userData,
        },
      })
      await prisma.userAuth.update({
        where: { id: userAuth.id },
        data: {
          ...userAuth,
        },
      })
    })
  }

  async findById(userId: number): Promise<MeDao | null> {
    const user = await this.prisma.user.findFirst({
      where: { id: userId },
    })
    if (!user) {
      return null
    }
    const users = meSchema.parse(user)
    return users
  }

  static builder(db: PrismaClient): IUserRepository {
    return new this(db)
  }
}
