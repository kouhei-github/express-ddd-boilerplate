import { Request, Response } from 'express'
import { ILoginUseCase, IRefreshTokenUseCase, ISignUpUseCase } from '../../../../../application/useCase/impluments/auth'
import { IGetUserUseCase } from '../../../../../application/useCase/impluments/user'
import { jwtClaimSchema } from '../../middleware/jwtPayload'
import { IAuthController } from '../../router/implument'
import { authSchema } from './schema'

export class AuthController implements IAuthController {
  constructor(
    private readonly signUpUseCase: ISignUpUseCase,
    private readonly loginUseCase: ILoginUseCase,
    private readonly refreshToken: IRefreshTokenUseCase,
    private readonly getUserUseCase: IGetUserUseCase,
  ) {}

  async signup(req: Request, res: Response): Promise<any> {
    try {
      const { email, password } = authSchema.parse(req.body)
      const result = await this.signUpUseCase.execute(email, password)
      if (result.status > 202) {
        return res.status(result.status).json(result.message)
      }
      return res.json(result.data)
    } catch (e) {
      return res.status(400).json({ data: `${JSON.stringify(e)}` })
    }
  }

  async login(req: Request, res: Response): Promise<any> {
    try {
      const { email, password } = authSchema.parse(req.body)
      const result = await this.loginUseCase.execute(email, password)
      if (result.status > 202) {
        return res.status(result.status).json(result.message)
      }
      return res.json(result.data).status(result.status)
    } catch (e) {
      return res.status(400).json({ data: `${JSON.stringify(e)}` })
    }
  }

  async refresh(req: Request, res: Response): Promise<any> {
    try {
      const { refreshToken } = req.body as { refreshToken: string }
      const result = await this.refreshToken.execute(refreshToken)
      return res.json(result.data).status(result.status)
    } catch (e) {
      return res.status(400).json({ data: `${JSON.stringify(e)}` })
    }
  }

  async me(_: Request, res: Response): Promise<any> {
    try {
      const claim = jwtClaimSchema.parse(res.locals['user'])
      const result = await this.getUserUseCase.execute(claim.userId)
      return res.json(result.data).status(result.status)
    } catch (e) {
      return res.status(400).json({ data: `${JSON.stringify(e)}` })
    }
  }

  static builder(
    signUpUseCase: ISignUpUseCase,
    loginUseCase: ILoginUseCase,
    refreshToken: IRefreshTokenUseCase,
    getUserUseCase: IGetUserUseCase,
  ) {
    return new this(signUpUseCase, loginUseCase, refreshToken, getUserUseCase)
  }
}
