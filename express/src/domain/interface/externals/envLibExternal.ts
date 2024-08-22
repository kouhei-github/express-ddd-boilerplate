export interface IEnvLibExternal {
  getDatabaseConnectUrl(): string
  getSecretKey(): string
  getUserPass(): string
  getUserName(): string
  getDatabase(): string
  getJwtSecretKey(): string
}
