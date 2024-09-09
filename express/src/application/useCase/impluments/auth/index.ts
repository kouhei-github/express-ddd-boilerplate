import { IResponse } from '../../index'

export interface ILoginUseCase {
  execute(email: string, password: string): Promise<IResponse>
}

export interface IRefreshTokenUseCase {
  execute(refreshToken: string): Promise<IResponse>
}

export interface ISignUpUseCase {
  execute(email: string, password: string): Promise<IResponse>
}

export interface IPasswordResetUseCase {
  execute(email: string): Promise<IResponse>
}

export interface IPasswordUpdateUseCase {
  execute(userId: number, password: string, token: string): Promise<IResponse>
}
