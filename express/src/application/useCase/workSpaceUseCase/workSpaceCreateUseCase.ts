import { IWorkSpaceRepository } from '../../../domain/interface/repositories/workSpaceRepository'
import { MaxMembers } from '../../../domain/models/workSpaceModel/maxMember'
import { WSName } from '../../../domain/models/workSpaceModel/name'
import { WSPicture } from '../../../domain/models/workSpaceModel/picture'
import { WSPlan } from '../../../domain/models/workSpaceModel/plan'
import { PlanEndDate } from '../../../domain/models/workSpaceModel/planEndDate'
import { PlanStartDate } from '../../../domain/models/workSpaceModel/planStartDate'
import { WSType } from '../../../domain/models/workSpaceModel/type'
import { WorkspaceRequestBody } from '../../../presentation/api/server/controller/workSpaceController/schema'
import { IWorkSpaceCreateUseCase } from '../impluments/workSpace'
import { IResponse } from '../index'

export class WorkSpaceCreateUseCase implements IWorkSpaceCreateUseCase {
  constructor(private readonly wr: IWorkSpaceRepository) {}

  public async execute(input: WorkspaceRequestBody): Promise<IResponse> {
    // Value Objectに変換
    const name = new WSName(input.name)
    const maxMember = new MaxMembers(input.maxMembers)
    const picture = new WSPicture(input.workspacePicture)
    const plan = new WSPlan(input.plan)
    const planStartDate = new PlanStartDate(input.planStartDate)
    const planEndDate = new PlanEndDate(input.planEndDate)
    const planType = new WSType(input.type)

    // ワークスペース名で検索
    const workspace = await this.wr.findByName(name.getValue())
    if (workspace) {
      return { data: workspace, status: 400, message: `既にワークスペース名「${input.name}」は存在します` }
    }
    const newWorkspace = this.wr.create({
      name: name.getValue(),
      maxMembers: maxMember.getValue(),
      workspacePicture: picture.getValue(),
      plan: plan.getValue(),
      planStartDate: planStartDate.getValue(),
      planEndDate: planEndDate.getValue(),
      type: planType.getValue(),
    })
    return { data: newWorkspace, status: 200, message: '新しいワークスペースを作成できました' }
  }

  static builder(wr: IWorkSpaceRepository): IWorkSpaceCreateUseCase {
    return new this(wr)
  }
}
