import { TaskRequestBody } from '../../../../presentation/api/server/controller/taskController/schema'
import { IResponse } from '../../index'

export interface ITaskCreateUseCase {
  execute(input: TaskRequestBody, userId: number): Promise<IResponse>
}

export interface ITaskGenerateUseCase {
  execute(input: {
    text: string
    model: string
    responseFormat: 'json' | 'text' | 'json_schema'
    temperature: number
  }): Promise<IResponse>
}

export interface ITaskGetUseCase {
  execute(taskId: number, userId: number): Promise<IResponse>
}

export interface ITaskListUseCase {
  execute(userId: number): Promise<IResponse>
}

export interface ITaskPatchUseCase {
  execute(taskId: number, userId: number, input: TaskRequestBody): Promise<IResponse>
}
