import { WorkspaceDto } from '../../../infrastructure/datastore/dto/workspace'

export interface IWorkSpaceRepository {
  create(input: {
    name: string
    workspacePicture: string
    plan: string
    planStartDate: string
    planEndDate: string
    maxMembers: number
    type: string
  }): Promise<WorkspaceDto>
  findByName(name: string): Promise<WorkspaceDto | null>
}
