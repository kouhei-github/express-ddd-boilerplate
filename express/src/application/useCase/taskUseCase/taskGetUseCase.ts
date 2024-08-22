import { ITaskRepository } from '../../../domain/interface/repositories/taskRepository'
import { IResponse } from '../index'

export class TaskGetUseCase {
  constructor(private readonly task: ITaskRepository) {}
  public async execute(taskId: number, userId: number): Promise<IResponse> {
    try {
      const task = await this.task.findById(taskId, userId)
      if (!task) {
        return { data: 'タスクが存在しません', status: 400, message: `タスクが存在しません` }
      }
      const result = {
        ...task,
        taskDeadline: task.taskDeadline.toString(),
      }
      return { data: result, status: 200, message: 'タスクの作成ができました' }
    } catch (e) {
      return {
        data: `${e}`,
        status: 400,
        message: `${e}`,
      }
    }
  }
  static builder(task: ITaskRepository): TaskGetUseCase {
    return new this(task)
  }
}
