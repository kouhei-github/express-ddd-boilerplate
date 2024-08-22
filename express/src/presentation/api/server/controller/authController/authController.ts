import { Request, Response } from 'express'
import { LoginUseCase } from '../../../../../application/useCase/authUseCase/loginUseCase'
import { RefreshTokenUseCase } from '../../../../../application/useCase/authUseCase/refreshTokenUseCase'
import { SignUpUseCase } from '../../../../../application/useCase/authUseCase/signUpUseCase'
import { IAuthController } from '../../router/implument'
import { authSchema } from './schema'

export class AuthController implements IAuthController {
  constructor(
    private readonly signUpUseCase: SignUpUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshToken: RefreshTokenUseCase,
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
        console.log(result)
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

  static builder(signUpUseCase: SignUpUseCase, loginUseCase: LoginUseCase, refreshToken: RefreshTokenUseCase) {
    return new this(signUpUseCase, loginUseCase, refreshToken)
  }
}
