export class WSPlan {
  private readonly plan: string
  constructor(plan: string | null) {
    if (plan === null) {
      this.plan = ''
      return
    }
    if (plan === '') throw new Error('workspace plan is required')

    this.plan = plan
  }

  public getValue(): string {
    return this.plan
  }
}
