export class Deadline {
  private readonly deadline: Date

  constructor(deadline: Date | null) {
    if (deadline === null) {
      throw new Error('Deadline is required')
    }

    this.deadline = deadline
  }

  public getValue(): Date {
    return this.deadline
  }
}
