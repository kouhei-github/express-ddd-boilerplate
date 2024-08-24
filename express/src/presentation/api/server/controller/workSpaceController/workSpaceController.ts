import { Request, Response } from 'express'
import { IWorkSpaceCreateUseCase } from '../../../../../application/useCase/impluments/workSpace'
import { IWorkSpaceController } from '../../router/implument'
import { workspaceRequestSchema } from './schema'

export class WorkSpaceController implements IWorkSpaceController {
  constructor(private readonly workSpaceCreateUseCase: IWorkSpaceCreateUseCase) {}
  async create(req: Request, res: Response): Promise<any> {
    try {
      const workspace = workspaceRequestSchema.parse(req.body)
      const result = await this.workSpaceCreateUseCase.execute(workspace)
      if (result.status > 202) {
        return res.status(result.status).json(result.message)
      }
      return res.status(200).json(workspace)
    } catch (e) {
      return res.status(400).json({ data: `${JSON.stringify(e)}` })
    }
  }

  static builder(workSpaceCreateUseCase: IWorkSpaceCreateUseCase): IWorkSpaceController {
    return new this(workSpaceCreateUseCase)
  }
}
