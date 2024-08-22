export class Password {
  private readonly password: string
  constructor(password: string) {
    if (password === '') throw new Error('Password is required')
    const maxLength = 6
    if (password.length < maxLength) throw new Error(`Passwordは${maxLength}文字以上で入力してください`)
    const hasSpecialCharacter = /[!@#\$%\^&\*\(\)\[\]{};':",.<>\?]/.test(password)
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasDigit = /[0-9]/.test(password)
    if (!hasUppercase || !hasLowercase || !hasDigit || !hasSpecialCharacter) {
      throw new Error(`パスワードは少なくとも1つの大文字、1つの小文字、1つの数字を含む必要があります。`)
    }
    this.password = password
  }

  public getValue(): string {
    return this.password
  }
}
