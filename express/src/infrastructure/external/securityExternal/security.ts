import crypto from 'crypto'
import { IEnvLibExternal } from '../../../domain/interface/externals/envLibExternal'
import { ISecurityService } from '../../../domain/interface/externals/securityExternal'

export class SecurityExternal implements ISecurityService {
  constructor(private readonly enbLib: IEnvLibExternal) {}
  authentication(salt: string, password: string): string {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(this.enbLib.getSecretKey()).digest('hex')
  }

  random(): string {
    return crypto.randomBytes(128).toString('base64')
  }
  static builder(enbLib: IEnvLibExternal): ISecurityService {
    return new this(enbLib)
  }
}
