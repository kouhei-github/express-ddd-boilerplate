import { PrismaClient } from '@prisma/client'
import { WorkspaceDto, workspaceSchema } from '../../../domain/interface/repositories/dto/workspace'
import { IWorkSpaceRepository } from '../../../domain/interface/repositories/workSpaceRepository'

export class WorkSpaceRepository implements IWorkSpaceRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(input: {
    name: string
    workspacePicture: string
    plan: string
    planStartDate: string
    planEndDate: string
    maxMembers: number
    type: string
  }): Promise<WorkspaceDto> {
    const workspace = await this.prisma.workspace.create({ data: input })
    return workspaceSchema.parse(workspace)
  }

  async findByName(name: string): Promise<WorkspaceDto | null> {
    const workspace = await this.prisma.workspace.findFirst({ where: { name: name } })
    if (!workspace) {
      return null
    }
    return workspaceSchema.parse(workspace)
  }

  static builder(db: PrismaClient): IWorkSpaceRepository {
    return new this(db)
  }
}
