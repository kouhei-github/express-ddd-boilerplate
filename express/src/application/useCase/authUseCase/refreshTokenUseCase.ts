import { IJwtTokenExternal } from '../../../domain/interface/externals/securityExternal'
import { IRefreshTokenUseCase } from '../impluments/auth'
import { IResponse } from '../index'

export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor(private readonly je: IJwtTokenExternal) {}

  public async execute(refreshToken: string): Promise<IResponse> {
    const claim = this.je.verifyToken(refreshToken)
    if (claim === null) {
      return { data: 'アクセストークンが無効です', status: 403, message: 'アクセストークンが無効です' }
    }
    // アクセストークンの作成
    const newAccessToken = this.je.createAccessToken(claim.email, claim.userId)

    const newRefreshToken = this.je.createRefreshToken(claim.email, claim.userId)

    const response = {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    }
    return { data: response, status: 200, message: 'リフレッシュできました' }
  }

  static builder(je: IJwtTokenExternal): IRefreshTokenUseCase {
    return new this(je)
  }
}
