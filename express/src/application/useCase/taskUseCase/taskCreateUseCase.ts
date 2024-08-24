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
import { ITaskCreateUseCase } from '../impluments/task'
import { IResponse } from '../index'

export class TaskCreateUseCase implements ITaskCreateUseCase {
  constructor(private readonly task: ITaskRepository) {}
  public async execute(input: TaskRequestBody, userId: number): Promise<IResponse> {
    try {
      const title = new Title(input.title)
      const text = new Text(input.text)
      const taskStatus = new TaskStatus(input.status)
      const taskDeadline = new TaskDeadline(input.taskDeadline)
      const url = new TaskUrl(input.url)
      const isDeleted = new IsDeleted(false)
      const isBookMark = new IsBookMark(input.isBookMark)
      const deadline = new Deadline(new Date(input.deadline))
      const existTask = await this.task.findByName(title.getValue(), userId)
      if (existTask) {
        return { data: existTask, status: 400, message: `既にタスク名「${title.getValue()}」は存在します` }
      }

      const task = await this.task.create({
        title: title.getValue(),
        taskDeadline: taskDeadline.getValue(),
        text: text.getValue(),
        status: taskStatus.getValue(),
        url: url.getValue(),
        isDeleted: isDeleted.getValue(),
        isBookMark: isBookMark.getValue(),
        deadline: deadline.getValue(),
        creatorUserId: userId,
      })
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
  static builder(task: ITaskRepository): ITaskCreateUseCase {
    return new this(task)
  }
}
