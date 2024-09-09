import { ITaskRepository } from '../../../domain/interface/repositories/taskRepository'
import { ITaskGetUseCase } from '../impluments/task'
import { IResponse } from '../index'

export class TaskGetUseCase implements ITaskGetUseCase {
  constructor(private readonly task: ITaskRepository) {}
  public async execute(taskId: number, userId: number): Promise<IResponse> {
    const task = await this.task.findById(taskId, userId)
    if (!task) {
      throw new Error('タスクが存在しません')
    }
    const result = {
      ...task,
      taskDeadline: task.taskDeadline.toString(),
    }
    return { data: result, status: 200 }
  }
  static builder(task: ITaskRepository): ITaskGetUseCase {
    return new this(task)
  }
}
