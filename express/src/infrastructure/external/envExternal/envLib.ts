import { z } from 'zod'
import { IEnvLibExternal } from '../../../domain/interface/externals/envLibExternal'

const envSchema = z.object({
  DATABASE: z.string(),
  USERNAME: z.string(),
  USER_PASS: z.string(),
  SECRET_KEY: z.string(),
  DATABASE_URL: z.string(),
  JWT_SECRET_KEY: z.string(),
})

export class EnvLibExternal implements IEnvLibExternal {
  private DATABASE: string
  private USERNAME: string
  private USER_PASS: string
  private SECRET_KEY: string
  private DATABASE_URL: string
  private JWT_SECRET_KEY: string
  constructor() {
    const { DATABASE, USERNAME, USER_PASS, DATABASE_URL, SECRET_KEY, JWT_SECRET_KEY } = envSchema.parse(process.env)
    this.DATABASE = DATABASE
    this.USERNAME = USERNAME
    this.USER_PASS = USER_PASS
    this.SECRET_KEY = SECRET_KEY
    this.DATABASE_URL = DATABASE_URL
    this.JWT_SECRET_KEY = JWT_SECRET_KEY
  }

  public getDatabase(): string {
    return this.DATABASE
  }

  public getUserName(): string {
    return this.USERNAME
  }

  public getUserPass(): string {
    return this.USER_PASS
  }

  public getSecretKey(): string {
    return this.SECRET_KEY
  }

  public getDatabaseConnectUrl(): string {
    return this.DATABASE_URL
  }

  public getJwtSecretKey(): string {
    return this.JWT_SECRET_KEY
  }

  static builder(): IEnvLibExternal {
    return new this()
  }
}
