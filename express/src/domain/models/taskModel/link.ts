export class TaskUrl {
  private readonly url: string

  constructor(url: string | null) {
    if (url === null || url === '') {
      throw new Error('URL is required')
    }

    if (!this.isValidUrl(url)) {
      throw new Error('Invalid URL format')
    }

    this.url = url
  }

  public getValue(): string {
    return this.url
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
