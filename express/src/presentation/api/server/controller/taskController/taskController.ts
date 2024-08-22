import { Request, Response } from 'express'
import { TaskCreateUseCase } from '../../../../../application/useCase/taskUseCase/taskCreateUseCase'
import { TaskGetUseCase } from '../../../../../application/useCase/taskUseCase/taskGetUseCase'
import { TaskListUseCase } from '../../../../../application/useCase/taskUseCase/taskListUseCase'
import { TaskPatchUseCase } from '../../../../../application/useCase/taskUseCase/taskPatchUseCase'
import { jwtClaimSchema } from '../../middleware/jwtPayload'
import { ITaskController } from '../../router/implument'
import { taskRequestSchema } from './schema'

export class TaskController implements ITaskController {
  constructor(
    private readonly taskCreate: TaskCreateUseCase,
    private readonly taskGet: TaskGetUseCase,
    private readonly taskPatch: TaskPatchUseCase,
    private readonly taskList: TaskListUseCase,
  ) {}
  async create(req: Request, res: Response): Promise<any> {
    try {
      const task = taskRequestSchema.parse(req.body)
      const claim = jwtClaimSchema.parse(res.locals['user'])
      const result = await this.taskCreate.execute(task, claim.userId)
      if (result.status > 202) {
        return res.status(result.status).json(result.message)
      }
      return res.json(result.data)
    } catch (e) {
      return res.status(400).json({ data: `${JSON.stringify(e)}` })
    }
  }

  async getTask(req: Request, res: Response): Promise<any> {
    try {
      const claim = jwtClaimSchema.parse(res.locals['user'])
      if (!req.params['id']) {
        return res.status(400).json({ message: 'id required' })
      }
      const result = await this.taskGet.execute(Number(req.params['id']), claim.userId)
      return res.json(result.data)
    } catch (e) {
      return res.status(400).json({ data: `${JSON.stringify(e)}` })
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    try {
      const task = taskRequestSchema.parse(req.body)
      const claim = jwtClaimSchema.parse(res.locals['user'])
      if (!req.params['id']) {
        return res.status(400).json({ message: 'id required' })
      }
      const result = await this.taskPatch.execute(Number(req.params['id']), claim.userId, task)
      if (result.status > 202) {
        return res.status(result.status).json(result.message)
      }
      return res.json(result.data)
    } catch (e) {
      return res.status(400).json({ data: `${JSON.stringify(e)}` })
    }
  }

  async list(_: Request, res: Response): Promise<any> {
    try {
      const claim = jwtClaimSchema.parse(res.locals['user'])
      const result = await this.taskList.execute(claim.userId)
      if (result.status > 202) {
        return res.status(result.status).json(result.message)
      }
      return res.json(result.data)
    } catch (e) {
      return res.status(400).json({ data: `${JSON.stringify(e)}` })
    }
  }

  static builder(
    taskCreate: TaskCreateUseCase,
    taskGet: TaskGetUseCase,
    taskPatch: TaskPatchUseCase,
    taskList: TaskListUseCase,
  ): ITaskController {
    return new this(taskCreate, taskGet, taskPatch, taskList)
  }
}