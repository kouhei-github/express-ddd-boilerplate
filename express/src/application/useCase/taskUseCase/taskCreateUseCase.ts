import { ITaskRepository } from '../../../domain/interface/repositories/taskRepository'
import { Deadline } from '../../../domain/models/taskModel/deadline'
import { IsBookMark } from '../../../domain/models/taskModel/isBookMark'
import { IsDeleted } from '../../../domain/models/taskModel/isDelete'
import { TaskUrl } from '../../../domain/models/taskModel/link'
import { TaskDeadline } from '../../../domain/models/taskModel/taskDeadline'
import { TaskStatus } from '../../../domain/models/taskModel/taskStatus'
import { Title } from '../../../domain/models/taskModel/title'
import { TaskRequestBody } from '../../../presentation/api/server/controller/taskController/schema'
import { ITaskCreateUseCase } from '../impluments/task'
import { IResponse } from '../index'

export class TaskCreateUseCase implements ITaskCreateUseCase {
  constructor(private readonly task: ITaskRepository) {}
  public async execute(input: TaskRequestBody, userId: number): Promise<IResponse> {
    const title = new Title(input.title)
    const taskStatus = new TaskStatus(input.status)
    const taskDeadline = new TaskDeadline(input.taskDeadline)
    const isDeleted = new IsDeleted(false)
    const isBookMark = new IsBookMark(input.isBookMark)
    const deadline = new Deadline(new Date(input.deadline))

    const task = await this.task.create({
      title: title.getValue(),
      taskDeadline: taskDeadline.getValue(),
      status: taskStatus.getValue(),
      isDeleted: isDeleted.getValue(),
      isBookMark: isBookMark.getValue(),
      deadline: deadline.getValue(),
      creatorUserId: userId,
      isMyTask: input.isMyTask,
      isTimeIncluded: input.isTimeIncluded,
      text: input.text ?? null,
      url: input.url ? new TaskUrl(input.url).getValue() : null,
    })
    const result = {
      ...task,
      taskDeadline: task.taskDeadline.toString(),
    }
    return { data: result, status: 200 }
  }
  static builder(task: ITaskRepository): ITaskCreateUseCase {
    return new this(task)
  }
}
