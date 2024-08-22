export class TaskDeadline {
  private readonly taskDeadline: number

  constructor(taskDeadline: number | null) {
    if (taskDeadline === null || !Number.isInteger(taskDeadline)) {
      throw new Error('TaskDeadline must be a valid timestamp')
    }

    this.taskDeadline = taskDeadline
  }

  public getValue(): number {
    return this.taskDeadline
  }
}
