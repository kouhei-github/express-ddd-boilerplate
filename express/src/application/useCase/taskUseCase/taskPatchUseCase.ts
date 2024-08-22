import { ITaskRepository } from '../../../domain/interface/repositories/taskRepository'
import { Deadline } from '../../../domain/models/taskModel/deadline'
import { IsBookMark } from '../../../domain/models/taskModel/isBookMark'
import { IsDeleted } from '../../../domain/models/taskModel/isDelete'
import { TaskUrl } from '../../../domain/models/taskModel/link'
import { TaskDeadline } from '../../../domain/models/taskModel/taskDeadline'
import { TaskStatus } from '../../../domain/models/taskModel/taskStatus'
import { Text } from '../../../domain/models/taskModel/text'
import { Title } from '../../../domain/models/taskModel/title'
import { TaskRequestBody } from '../../../presentation/api/server/controller/taskController/schema'
import { IResponse } from '../index'

export class TaskPatchUseCase {
  constructor(private readonly tr: ITaskRepository) {}
  public async execute(taskId: number, userId: number, input: TaskRequestBody): Promise<IResponse> {
    try {
      const title = new Title(input.title)
      const text = new Text(input.text)
      const taskStatus = new TaskStatus(input.status)
      const taskDeadline = new TaskDeadline(input.taskDeadline)
      const url = new TaskUrl(input.url)
      const isDeleted = new IsDeleted(input.isDeleted)
      const isBookMark = new IsBookMark(input.isBookMark)
      const deadline = new Deadline(new Date(input.deadline))
      const task = await this.tr.findById(taskId, userId)
      if (!task) {
        return { data: 'タスクが存在しません', status: 400, message: `タスクが存在しません` }
      }

      const updateTask = await this.tr.update(
        {
          title: title.getValue(),
          taskDeadline: taskDeadline.getValue(),
          text: text.getValue(),
          status: taskStatus.getValue(),
          url: url.getValue(),
          isDeleted: isDeleted.getValue(),
          isBookMark: isBookMark.getValue(),
          deadline: deadline.getValue(),
        },
        userId,
        taskId,
      )

      const result = {
        ...updateTask,
        taskDeadline: updateTask.taskDeadline.toString(),
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
  static builder(task: ITaskRepository): TaskPatchUseCase {
    return new this(task)
  }
}
