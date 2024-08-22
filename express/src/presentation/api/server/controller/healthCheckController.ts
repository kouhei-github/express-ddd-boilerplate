import { Request, Response } from 'express'
import { IHealthCheckController } from '../router/implument'

export class HealthCheckController implements IHealthCheckController {
  async healthCheck(_: Request, res: Response): Promise<any> {
    return res.status(200).json({ message: 'OK!' })
  }

  static builder(): IHealthCheckController {
    return new this()
  }
}
