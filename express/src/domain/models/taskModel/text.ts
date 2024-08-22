export class Text {
  private readonly text: string

  constructor(text: string | null) {
    if (text === null || text === '') {
      throw new Error('Text is required')
    }

    this.text = text
  }

  public getValue(): string {
    return this.text
  }
}
