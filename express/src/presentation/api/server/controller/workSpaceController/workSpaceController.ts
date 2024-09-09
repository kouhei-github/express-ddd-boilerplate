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
      return res.status(200).json(result.data)
    } catch (error) {
      if (error instanceof Error) {
        // エラーをキャッチ
        return res.status(400).json({ data: `${error.message}` })
      }
      return res.status(400).json({ data: `予期せぬエラーが発生しました` })
    }
  }

  static builder(workSpaceCreateUseCase: IWorkSpaceCreateUseCase): IWorkSpaceController {
    return new this(workSpaceCreateUseCase)
  }
}
