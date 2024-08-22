import { sign, verify } from 'jsonwebtoken'
import { IEnvLibExternal } from '../../../domain/interface/externals/envLibExternal'
import { IJwtTokenExternal, TokenPayload } from '../../../domain/interface/externals/securityExternal'

export class JwtTokenExternal implements IJwtTokenExternal {
  constructor(private readonly enbLib: IEnvLibExternal) {}
  public createAccessToken(email: string, userId: number): string {
    const payload: TokenPayload = {
      email: email,
      userId: userId,
    }
    // トークンを発行
    const token = sign(payload, this.enbLib.getJwtSecretKey(), { expiresIn: '1h' }) // トークンの有効期限を1時間に設定
    return token
  }

  // リフレッシュトークンの作成
  public createRefreshToken(email: string, userId: number): string {
    const payload: TokenPayload = {
      email: email,
      userId: userId,
    }

    const refreshToken = sign(payload, this.enbLib.getJwtSecretKey(), { expiresIn: '7d' }) // リフレッシュトークンの有効期限を7日間に設定
    return refreshToken
  }

  public verifyToken(token: string): TokenPayload | null {
    try {
      const decoded = verify(token, this.enbLib.getJwtSecretKey()) as TokenPayload

      return decoded // トークンが有効な場合、デコードされたクレームを返す
    } catch (err) {
      return null // トークンが無効または期限切れの場合、nullを返す
    }
  }

  static builder(enbLib: IEnvLibExternal): IJwtTokenExternal {
    return new this(enbLib)
  }
}
