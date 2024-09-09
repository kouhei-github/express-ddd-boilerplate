import { TaskDto } from './dto/task'

export interface ITaskRepository {
  create(input: {
    title: string
    text: string | null
    url: string | null
    taskDeadline: number
    status: number
    isDeleted: boolean
    isBookMark: number
    deadline: Date
    creatorUserId: number
    isMyTask: boolean
    isTimeIncluded: boolean
  }): Promise<TaskDto>
  findByName(name: string, userId: number): Promise<TaskDto | null>
  findById(taskId: number, userId: number): Promise<TaskDto | null>
  update(
    input: {
      title: string
      text: string | null
      url: string | null
      taskDeadline: number
      status: number
      isDeleted: boolean
      isBookMark: number
      deadline: Date
      isMyTask: boolean
      isTimeIncluded: boolean
    },
    creatorUserId: number,
    taskId: number,
  ): Promise<TaskDto>
  findByUserId(userId: number): Promise<TaskDto[]>
}
