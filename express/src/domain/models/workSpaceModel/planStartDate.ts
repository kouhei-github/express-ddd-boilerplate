export class PlanStartDate {
  private readonly planStartDate: string

  constructor(planStartDate: string | null) {
    if (planStartDate === null) {
      throw new Error('Plan start date is required')
    }

    if (!this.isValidIsoDate(planStartDate)) {
      throw new Error('Invalid ISO 8601 date format')
    }

    this.planStartDate = planStartDate
  }

  public getValue(): string {
    return this.planStartDate
  }

  private isValidIsoDate(date: string): boolean {
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/
    return isoDateRegex.test(date)
  }
}
