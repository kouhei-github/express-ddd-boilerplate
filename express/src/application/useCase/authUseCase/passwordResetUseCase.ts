import { pick } from 'lodash'
import { IEnvLibExternal } from '../../../domain/interface/externals/envLibExternal'
import { IMailExternal } from '../../../domain/interface/externals/mailExternal'
import { IJwtTokenExternal } from '../../../domain/interface/externals/securityExternal'
import { IUserAuthRepository } from '../../../domain/interface/repositories/userAuthRepository'
import { IUserRepository } from '../../../domain/interface/repositories/userRepository'
import { Email } from '../../../domain/models/userModel/email'
import { IPasswordResetUseCase } from '../impluments/auth'
import { IResponse } from '../index'

export class PasswordResetUseCase implements IPasswordResetUseCase {
  constructor(
    private readonly ur: IUserRepository,
    private readonly uar: IUserAuthRepository,
    private readonly mailer: IMailExternal,
    private readonly je: IJwtTokenExternal,
    private readonly enLib: IEnvLibExternal,
  ) {}
  public async execute(email: string): Promise<IResponse> {
    // Userの取得
    const user = await this.ur.findUserByEmail(email)
    if (!user) {
      throw new Error('ユーザーが存在しません')
    }
    // value objectの生成
    const toVo = new Email(user.email)
    // from
    const fromVo = new Email('noreply@zenmetry.net')

    // トークンの生成
    const token = this.je.createAccessToken(user.email, user.id)

    // トークンをDBに保存
    user.userAuth.passwordResetToken = token
    await this.uar.update(user.userAuth)

    // URLの生成
    const uri = this.enLib.getFrontUrl()
    const frontUri = `${uri}/chrome-extension/password-reset?token=${token}&me=${user.id}`

    // メール送信
    await this.mailer.send(
      toVo.getValue(),
      fromVo.getValue(),
      'パスワードリセットのご案内',
      `パスワードを下記URLよりリセットしてください\n\n${frontUri}`,
    )
    return {
      data: pick(user, ['id', 'name', 'profilePicture', 'status', 'language', 'timezone']),
      status: 200,
    }
  }

  static builder(
    ur: IUserRepository,
    uar: IUserAuthRepository,
    mailer: IMailExternal,
    je: IJwtTokenExternal,
    enLib: IEnvLibExternal,
  ): IPasswordResetUseCase {
    return new this(ur, uar, mailer, je, enLib)
  }
}
