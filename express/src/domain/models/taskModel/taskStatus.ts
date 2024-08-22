export class TaskStatus {
  private readonly status: number

  constructor(status: number | null) {
    if (status === null || !Number.isInteger(status)) {
      throw new Error('Status must be an integer')
    }

    this.status = status
  }

  public getValue(): number {
    return this.status
  }
}
