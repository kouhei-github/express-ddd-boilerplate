import { ITaskRepository } from '../../../domain/interface/repositories/taskRepository'
import { Deadline } from '../../../domain/models/taskModel/deadline'
import { IsBookMark } from '../../../domain/models/taskModel/isBookMark'
import { IsDeleted } from '../../../domain/models/taskModel/isDelete'
import { TaskUrl } from '../../../domain/models/taskModel/link'
import { TaskDeadline } from '../../../domain/models/taskModel/taskDeadline'
import { TaskStatus } from '../../../domain/models/taskModel/taskStatus'
import { Title } from '../../../domain/models/taskModel/title'
import { TaskRequestBody } from '../../../presentation/api/server/controller/taskController/schema'
import { ITaskPatchUseCase } from '../impluments/task'
import { IResponse } from '../index'

export class TaskPatchUseCase implements ITaskPatchUseCase {
  constructor(private readonly tr: ITaskRepository) {}
  public async execute(taskId: number, userId: number, input: TaskRequestBody): Promise<IResponse> {
    const title = new Title(input.title)
    const taskStatus = new TaskStatus(input.status)
    const taskDeadline = new TaskDeadline(input.taskDeadline)
    const isDeleted = new IsDeleted(input.isDeleted)
    const isBookMark = new IsBookMark(input.isBookMark)
    const deadline = new Deadline(new Date(input.deadline))
    const task = await this.tr.findById(taskId, userId)
    if (!task) {
      throw new Error('タスクが存在しません')
    }

    const updateTask = await this.tr.update(
      {
        title: title.getValue(),
        taskDeadline: taskDeadline.getValue(),
        text: input.text ?? null,
        status: taskStatus.getValue(),
        url: input.url ? new TaskUrl(input.url).getValue() : null,
        isDeleted: isDeleted.getValue(),
        isBookMark: isBookMark.getValue(),
        deadline: deadline.getValue(),
        isMyTask: input.isMyTask,
        isTimeIncluded: input.isTimeIncluded,
      },
      userId,
      taskId,
    )

    const result = {
      ...updateTask,
      taskDeadline: updateTask.taskDeadline.toString(),
    }
    return { data: result, status: 200 }
  }
  static builder(task: ITaskRepository): ITaskPatchUseCase {
    return new this(task)
  }
}
