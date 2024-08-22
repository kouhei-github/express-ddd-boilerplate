import { Request, Response } from 'express'
import { AllUserUseCase } from '../../../../../application/useCase/userUseCase/allUser'
import { IUserController } from '../../router/implument'

export class UserController implements IUserController {
  constructor(private allUserUseCase: AllUserUseCase) {}

  async getUsers(req: Request, res: Response) {
    const result = await this.allUserUseCase.execute()
    console.log(req.body)
    res.json(result.data).status(result.status)
  }

  static builder(allUserUseCase: AllUserUseCase) {
    return new this(allUserUseCase)
  }
}
