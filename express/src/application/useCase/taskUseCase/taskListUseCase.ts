import { ITaskRepository } from '../../../domain/interface/repositories/taskRepository'
import { IResponse } from '../index'

export class TaskListUseCase {
  constructor(private readonly task: ITaskRepository) {}
  public async execute(userId: number): Promise<IResponse> {
    try {
      const tasks = await this.task.findByUserId(userId)
      const result = tasks.map((task) => ({ ...task, taskDeadline: task.taskDeadline.toString() }))
      return { data: result, status: 200, message: 'タスクの作成ができました' }
    } catch (e) {
      return {
        data: `${e}`,
        status: 400,
        message: `${e}`,
      }
    }
  }
  static builder(task: ITaskRepository): TaskListUseCase {
    return new this(task)
  }
}
