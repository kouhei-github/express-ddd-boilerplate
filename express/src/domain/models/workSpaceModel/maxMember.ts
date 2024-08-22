export class MaxMembers {
  private readonly maxMembers: number

  constructor(maxMembers: number | null) {
    if (maxMembers === null || maxMembers < 1) {
      throw new Error('Max members must be a positive integer')
    }

    if (!Number.isInteger(maxMembers)) {
      throw new Error('Max members must be an integer')
    }

    this.maxMembers = maxMembers
  }

  public getValue(): number {
    return this.maxMembers
  }
}
