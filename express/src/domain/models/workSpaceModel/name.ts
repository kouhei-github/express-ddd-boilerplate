export class WSName {
  private readonly name: string
  constructor(name: string | null) {
    if (name === null) {
      this.name = ''
      return
    }
    if (name === '') throw new Error('workspace name is required')

    this.name = name
  }

  public getValue(): string {
    return this.name
  }
}
