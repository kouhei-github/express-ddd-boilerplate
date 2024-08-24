import { WorkspaceRequestBody } from '../../../../presentation/api/server/controller/workSpaceController/schema'
import { IResponse } from '../../index'

export interface IWorkSpaceCreateUseCase {
  execute(input: WorkspaceRequestBody): Promise<IResponse>
}
