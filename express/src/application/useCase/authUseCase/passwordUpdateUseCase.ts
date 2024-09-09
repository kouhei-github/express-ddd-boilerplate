import { IJwtTokenExternal, ISecurityService } from '../../../domain/interface/externals/securityExternal'
import { IUserAuthRepository } from '../../../domain/interface/repositories/userAuthRepository'
import { IUserRepository } from '../../../domain/interface/repositories/userRepository'
import { Password } from '../../../domain/models/userModel/password'
import { IPasswordUpdateUseCase } from '../impluments/auth'
import { IResponse } from '../index'

export class PasswordUpdateUseCase implements IPasswordUpdateUseCase {
  constructor(
    private readonly ur: IUserRepository,
    private readonly uar: IUserAuthRepository,
    private readonly je: IJwtTokenExternal,
    private readonly se: ISecurityService,
  ) {}

  public async execute(userId: number, password: string, token: string): Promise<IResponse> {
    const tokenPayload = this.je.verifyToken(token)
    if (!tokenPayload) {
      throw new Error('Failed Authenticated')
    }

    const user = await this.ur.findUserByEmail(tokenPayload.email)
    if (!user) {
      throw new Error('ユーザーが存在しません')
    }

    if (user.id !== userId) {
      throw new Error('入力に誤りがあります')
    }

    console.log(user.userAuth.passwordResetToken)
    console.log(token)
    if (user.userAuth.passwordResetToken !== token) {
      throw new Error('トークンが違います')
    }

    const passwordVo = new Password(password)
    // パスワードのソルト
    const salt = this.se.random()
    const hashPassword = this.se.authentication(salt, passwordVo.getValue())

    await this.uar.update({
      id: user.userAuthId,
      passwordSalt: salt,
      passwordHash: hashPassword,
      passwordResetToken: null,
    })
    return { data: '更新できました', status: 200 }
  }

  static builder(
    ur: IUserRepository,
    uar: IUserAuthRepository,
    je: IJwtTokenExternal,
    se: ISecurityService,
  ): IPasswordUpdateUseCase {
    return new this(ur, uar, je, se)
  }
}
