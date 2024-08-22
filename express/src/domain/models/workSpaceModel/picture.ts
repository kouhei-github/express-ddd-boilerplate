export class WSPicture {
  private readonly picture: string

  constructor(picture: string | null) {
    if (picture === null) {
      this.picture = ''
      return
    }

    if (picture === '') throw new Error('Workspace picture is required')

    if (!this.isValidUrl(picture)) {
      throw new Error('Invalid URL format')
    }

    this.picture = picture
  }

  public getValue(): string {
    return this.picture
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch (e) {
      return false
    }
  }
}
