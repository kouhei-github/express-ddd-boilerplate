import { z } from 'zod'
import { IEnvLibExternal } from '../../../domain/interface/externals/envLibExternal'

const envSchema = z.object({
  SECRET_KEY: z.string(),
  JWT_SECRET_KEY: z.string(),
  SEND_GRID_API_KEY: z.string(),
  FRONT_URL: z.string(),
})

export class EnvLibExternal implements IEnvLibExternal {
  private SECRET_KEY: string
  private JWT_SECRET_KEY: string
  private SEND_GRID_API_KEY: string
  private FRONT_URL: string
  constructor() {
    const { SECRET_KEY, JWT_SECRET_KEY, SEND_GRID_API_KEY, FRONT_URL } = envSchema.parse(process.env)
    this.SECRET_KEY = SECRET_KEY
    this.JWT_SECRET_KEY = JWT_SECRET_KEY
    this.SEND_GRID_API_KEY = SEND_GRID_API_KEY
    this.FRONT_URL = FRONT_URL
  }

  public getSecretKey(): string {
    return this.SECRET_KEY
  }

  public getJwtSecretKey(): string {
    return this.JWT_SECRET_KEY
  }

  public getSendGridApiKey(): string {
    return this.SEND_GRID_API_KEY
  }

  public getFrontUrl(): string {
    return this.FRONT_URL
  }

  static builder(): IEnvLibExternal {
    return new this()
  }
}
