import { Request, Response } from 'express'
import {
  ILoginUseCase,
  IPasswordResetUseCase,
  IPasswordUpdateUseCase,
  IRefreshTokenUseCase,
  ISignUpUseCase,
} from '../../../../../application/useCase/impluments/auth'
import { IGetUserUseCase } from '../../../../../application/useCase/impluments/user'
import { jwtClaimSchema } from '../../middleware/jwtPayload'
import { IAuthController } from '../../router/implument'
import { authSchema, passwordResetSchema, passwordUpdateSchema } from './schema'

export class AuthController implements IAuthController {
  constructor(
    private readonly signUpUseCase: ISignUpUseCase,
    private readonly loginUseCase: ILoginUseCase,
    private readonly refreshToken: IRefreshTokenUseCase,
    private readonly getUserUseCase: IGetUserUseCase,
    private readonly passwordResetUseCase: IPasswordResetUseCase,
    private readonly passwordUpdateUseCase: IPasswordUpdateUseCase,
  ) {}

  async signup(req: Request, res: Response): Promise<any> {
    try {
      const { email, password } = authSchema.parse(req.body)
      const result = await this.signUpUseCase.execute(email, password)
      return res.json(result.data)
    } catch (error) {
      if (error instanceof Error) {
        // エラーをキャッチ
        return res.status(400).json({ data: `${error.message}` })
      }
      return res.status(400).json({ data: `予期せぬエラーが発生しました` })
    }
  }

  async login(req: Request, res: Response): Promise<any> {
    try {
      const { email, password } = authSchema.parse(req.body)
      const result = await this.loginUseCase.execute(email, password)
      return res.json(result.data).status(result.status)
    } catch (error) {
      if (error instanceof Error) {
        // エラーをキャッチ
        return res.status(400).json({ data: `${error.message}` })
      }
      return res.status(400).json({ data: `予期せぬエラーが発生しました` })
    }
  }

  async refresh(req: Request, res: Response): Promise<any> {
    try {
      const { refreshToken } = req.body as { refreshToken: string }
      const result = await this.refreshToken.execute(refreshToken)
      return res.json(result.data).status(result.status)
    } catch (error) {
      if (error instanceof Error) {
        // エラーをキャッチ
        return res.status(400).json({ data: `${error.message}` })
      }
      return res.status(400).json({ data: `予期せぬエラーが発生しました` })
    }
  }

  async me(_: Request, res: Response): Promise<any> {
    try {
      const claim = jwtClaimSchema.parse(res.locals['user'])
      const result = await this.getUserUseCase.execute(claim.userId)
      return res.json(result.data).status(result.status)
    } catch (error) {
      if (error instanceof Error) {
        // エラーをキャッチ
        return res.status(400).json({ data: `${error.message}` })
      }
      return res.status(400).json({ data: `予期せぬエラーが発生しました` })
    }
  }

  async passwordReset(req: Request, res: Response): Promise<any> {
    try {
      const { email } = passwordResetSchema.parse(req.body)

      const result = await this.passwordResetUseCase.execute(email)
      return res.json(result.data).status(result.status)
    } catch (error) {
      if (error instanceof Error) {
        // エラーをキャッチ
        return res.status(400).json({ data: `${error.message}` })
      }
      return res.status(400).json({ data: `予期せぬエラーが発生しました` })
    }
  }

  async passwordUpdate(req: Request, res: Response): Promise<any> {
    try {
      const { password, token } = passwordUpdateSchema.parse(req.body)
      const userId = req.params['userId']
      if (!userId) {
        return res.status(400).json({ data: `ユーザーIDを指定してください` })
      }
      // パスワードの確認とtokenの有効期限の確認
      const result = await this.passwordUpdateUseCase.execute(Number(userId), password, token)
      return res.json(result.data).status(result.status)
    } catch (error) {
      if (error instanceof Error) {
        // エラーをキャッチ
        return res.status(400).json({ data: `${error.message}` })
      }
      return res.status(400).json({ data: `予期せぬエラーが発生しました` })
    }
  }

  static builder(
    signUpUseCase: ISignUpUseCase,
    loginUseCase: ILoginUseCase,
    refreshToken: IRefreshTokenUseCase,
    getUserUseCase: IGetUserUseCase,
    passwordResetUseCase: IPasswordResetUseCase,
    passwordUpdateUseCase: IPasswordUpdateUseCase,
  ) {
    return new this(
      signUpUseCase,
      loginUseCase,
      refreshToken,
      getUserUseCase,
      passwordResetUseCase,
      passwordUpdateUseCase,
    )
  }
}
