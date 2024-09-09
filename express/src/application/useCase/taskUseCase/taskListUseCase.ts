import { ITaskRepository } from '../../../domain/interface/repositories/taskRepository'
import { ITaskListUseCase } from '../impluments/task'
import { IResponse } from '../index'

export class TaskListUseCase implements ITaskListUseCase {
  constructor(private readonly task: ITaskRepository) {}
  public async execute(userId: number): Promise<IResponse> {
    const tasks = await this.task.findByUserId(userId)
    const result = tasks.map((task) => ({ ...task, taskDeadline: task.taskDeadline.toString() }))
    return { data: result, status: 200 }
  }
  static builder(task: ITaskRepository): ITaskListUseCase {
    return new this(task)
  }
}
