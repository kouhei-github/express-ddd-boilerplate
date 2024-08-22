export class IsBookMark {
  private readonly isBookMark: number

  constructor(isBookMark: number | null) {
    if (isBookMark === null || ![0, 1].includes(isBookMark)) {
      throw new Error('isBookMark must be either 0 or 1')
    }

    this.isBookMark = isBookMark
  }

  public getValue(): number {
    return this.isBookMark
  }
}
