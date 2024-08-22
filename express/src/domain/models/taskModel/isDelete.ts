export class IsDeleted {
  private readonly isDeleted: boolean

  constructor(isDeleted: boolean | null) {
    if (isDeleted === null) {
      throw new Error('isDeleted is required')
    }

    this.isDeleted = isDeleted
  }

  public getValue(): boolean {
    return this.isDeleted
  }
}
