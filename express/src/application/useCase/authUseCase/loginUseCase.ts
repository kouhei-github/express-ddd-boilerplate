import { pick } from 'lodash'
import { IJwtTokenExternal, ISecurityService } from '../../../domain/interface/externals/securityExternal'
import { IUserRepository } from '../../../domain/interface/repositories/userRepository'
import { Email } from '../../../domain/models/userModel/email'
import { Password } from '../../../domain/models/userModel/password'
import { ILoginUseCase } from '../impluments/auth'
import { IResponse } from '../index'

export class LoginUseCase implements ILoginUseCase {
  /**
   *
   * @param ur {IUserRepository} - The user repository to be used for data access operations
   * @param se {ISecurityService} - The security service to be used for authentication and authorization
   */
  constructor(
    private readonly ur: IUserRepository,
    private readonly se: ISecurityService,
    private readonly je: IJwtTokenExternal,
  ) {}

  /**
   * Executes the authentication process using the given email and password.
   *
   * @param {string} email - The email address of the user.
   * @param {string} password - The password of the user.
   *
   * @return {Promise<IResponse>} A promise that resolves to an object representing the response of the authentication process. The object has the following properties:
   * - data: The email address of the user.
   * - status: The status code indicating the result of the authentication process.
   * - message: A message describing the result of the authentication process.
   */
  public async execute(email: string, password: string): Promise<IResponse> {
    const emailVo = new Email(email)
    const passwordVo = new Password(password)

    const existUser = await this.ur.findUserByEmail(emailVo.getValue())
    if (existUser === null) {
      return { data: '', status: 400, message: 'メールアドレス or パスワードが正しく無いです' }
    }

    // ハッシュ化する
    const hashPassword = this.se.authentication(existUser.userAuth.passwordSalt, passwordVo.getValue())

    // 入力されたパスワードのハッシュ値とDBのハッシュ値が正しいか確認
    if (hashPassword !== existUser.userAuth.passwordHash) {
      return {
        data: 'メールアドレス or パスワード',
        status: 403,
        message: 'メールアドレス or パスワードが正しくありません',
      }
    }

    // アクセストークンの作成
    const accessToken = this.je.createAccessToken(existUser.email, existUser.id)

    const refreshToken = this.je.createRefreshToken(existUser.email, existUser.id)

    const response = {
      accessToken,
      refreshToken,
      user: pick(existUser, ['id', 'name', 'profilePicture', 'status', 'language', 'timezone']),
    }

    return { data: response, status: 200, message: 'ログインできました' }
  }

  /**
   * Creates a new instance of the Builder class.
   *
   * @param {IUserRepository} ur - The user repository object.
   * @param {ISecurityService} se - The security service object.
   *
   * @return {LoginUseCase} - The newly created Builder object.
   */
  static builder(ur: IUserRepository, se: ISecurityService, je: IJwtTokenExternal): ILoginUseCase {
    return new this(ur, se, je)
  }
}
