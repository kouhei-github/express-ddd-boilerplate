import { PrismaClient } from '@prisma/client'
import { TaskDto, taskListSchema, taskSchema } from '../../../domain/interface/repositories/dto/task'
import { ITaskRepository } from '../../../domain/interface/repositories/taskRepository'

// Prismaが生成したTaskCreateInputの型を拡張
export class TaskRepository implements ITaskRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(input: {
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
  }): Promise<TaskDto> {
    const task = await this.prisma.task.create({
      data: { ...input },
      include: { creatorUser: true },
    })
    return taskSchema.parse(task)
  }

  async findByName(name: string, userId: number): Promise<TaskDto | null> {
    const task = await this.prisma.task.findFirst({ where: { title: name, creatorUserId: userId } })
    if (!task) {
      return null
    }
    return taskSchema.parse(task)
  }

  async findById(taskId: number, userId: number): Promise<TaskDto | null> {
    const task = await this.prisma.task.findFirst({ where: { id: taskId, creatorUserId: userId } })
    if (!task) {
      return null
    }
    return taskSchema.parse(task)
  }

  async update(
    input: {
      title: string
      text: string | null
      url: string | null
      taskDeadline: number
      status: number
      isDeleted: boolean
      isBookMark: number
      deadline: Date
    },
    creatorUserId: number,
    taskId: number,
  ): Promise<TaskDto> {
    const task = await this.prisma.task.update({
      where: { id: taskId, creatorUserId: creatorUserId },
      data: {
        ...input,
      },
    })
    return taskSchema.parse(task)
  }

  async findByUserId(userId: number): Promise<TaskDto[]> {
    const tasks = await this.prisma.task.findMany({ where: { creatorUserId: userId, isDeleted: false } })
    return taskListSchema.parse(tasks)
  }

  static builder(db: PrismaClient): ITaskRepository {
    return new this(db)
  }
}
