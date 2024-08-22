export class Title {
  private readonly title: string

  constructor(title: string | null) {
    if (title === null || title === '') {
      throw new Error('Title is required')
    }

    this.title = title
  }

  public getValue(): string {
    return this.title
  }
}
