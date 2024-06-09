import {Request, Response} from 'express'
import {SignUpUseCase} from "../../../../application/useCase/authUseCase/signUpUseCase";
import {AllUserUseCase} from "../../../../application/useCase/userUseCase/allUser";
import {IUserController} from "../router/implument";
import {LoginUseCase} from "../../../../application/useCase/authUseCase/loginUseCase";


export class UserController implements IUserController {
  constructor(
      private signUpUseCase: SignUpUseCase,
      private allUserUseCase: AllUserUseCase,
      private loginUseCase: LoginUseCase
  ) {
  }

  async signup(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>
  {
    const {email, password} = req.body as {email: string, password: string}
    const result = await this.signUpUseCase.execute(email, password)

    if (result.status > 202){
      return res.json(result.message).status(result.status);
    }

    res.json(result.data);
  }

  async getUsers(req: Request, res: Response)
  {
    const result = await this.allUserUseCase.execute()

    res.json(result.data).status(result.status);
  }

  async login(req: Request, res: Response): Promise<any>
  {
    const {email, password} = req.body as {email: string, password: string};
    const result = await this.loginUseCase.execute(email, password);
    res.cookie(
        "RULE-THE-FATE-AUTH",
        result.data.sessionToken,
        {domain: process.env.DOMAIN, path: "/", }
    )
    return res.json(result.data).status(result.status);
  }

  static builder(
      signUpUseCase: SignUpUseCase,
      allUserUseCase: AllUserUseCase,
      loginUseCase: LoginUseCase,
  ) {
    return new this(
        signUpUseCase,
        allUserUseCase,
        loginUseCase,
      )
  }
}