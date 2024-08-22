import { JwtPayload } from 'jsonwebtoken'

export interface TokenPayload extends JwtPayload {
  email: string
  userId: number
}

export interface ISecurityService {
  authentication(salt: string, password: string): string
  random(): string
}

export interface IJwtTokenExternal {
  createAccessToken(email: string, userId: number): string
  createRefreshToken(email: string, userId: number): string
  verifyToken(token: string): TokenPayload | null
}
