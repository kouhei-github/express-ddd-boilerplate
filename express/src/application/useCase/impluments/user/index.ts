import { IResponse } from '../../index'

export interface IGetUserUseCase {
  execute(userId: number): Promise<IResponse>
}
