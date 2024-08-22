export class WSType {
  private readonly type: string

  constructor(type: string | null) {
    const allowedTypes = ['Team', 'Individual']

    if (type === null || type === '') {
      throw new Error('Type is required')
    }

    if (!allowedTypes.includes(type)) {
      throw new Error(`Invalid type. Allowed types are: ${allowedTypes.join(', ')}`)
    }

    this.type = type
  }

  public getValue(): string {
    return this.type
  }
}
