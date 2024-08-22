export class PlanEndDate {
  private readonly planEndDate: string

  constructor(planEndDate: string | null) {
    if (planEndDate === null) {
      throw new Error('Plan start date is required')
    }

    if (!this.isValidIsoDate(planEndDate)) {
      throw new Error('Invalid ISO 8601 date format')
    }

    this.planEndDate = planEndDate
  }

  public getValue(): string {
    return this.planEndDate
  }

  private isValidIsoDate(date: string): boolean {
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/
    return isoDateRegex.test(date)
  }
}
