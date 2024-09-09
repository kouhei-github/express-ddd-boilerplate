export interface IEnvLibExternal {
  getSecretKey(): string
  getJwtSecretKey(): string
  getSendGridApiKey(): string
  getFrontUrl(): string
}
