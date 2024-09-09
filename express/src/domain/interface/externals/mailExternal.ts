export interface IMailExternal {
  /**
   * メール送信用のメソッド
   * @param to 宛先のメールアドレス
   * @param from 送信元のメールアドレス
   * @param subject メールの題名
   * @param text メールの内容本文
   */
  send(to: string, from: string, subject: string, text: string): Promise<void>
}
