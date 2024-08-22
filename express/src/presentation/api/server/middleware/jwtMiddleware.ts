import { NextFunction, Request, Response } from 'express'
import { IJwtTokenExternal } from '../../../../domain/interface/externals/securityExternal'

export interface IJwtMiddleware {
  jwtCheck(req: Request, res: Response, next: NextFunction): Promise<any>
}

export class JwtMiddleware implements IJwtMiddleware {
  constructor(private jwtExt: IJwtTokenExternal) {}

  async jwtCheck(req: Request, res: Response, next: NextFunction): Promise<any> {
    const bearerToken = req.headers['authorization'] as string
    if (!bearerToken) {
      const message = 'Failed Authenticated'
      return res.status(403).json({ message }).end()
    }
    const accessToken = bearerToken.replace('Bearer ', '')
    const tokenPayload = this.jwtExt.verifyToken(accessToken)
    if (!tokenPayload) {
      const message = 'Failed Authenticated'
      return res.status(403).json({ message }).end()
    }
    res.locals['user'] = tokenPayload
    return next()
  }

  static builder(jwt: IJwtTokenExternal): IJwtMiddleware {
    return new this(jwt)
  }
}
