import sendgrid from '@sendgrid/mail'
import { IEnvLibExternal } from '../../../domain/interface/externals/envLibExternal'
import { IMailExternal } from '../../../domain/interface/externals/mailExternal'

export class EmailSendGrid implements IMailExternal {
  constructor(private readonly envLib: IEnvLibExternal) {}

  /**
   * メール送信用のメソッド
   * @param to 宛先のメールアドレス
   * @param from 送信元のメールアドレス
   * @param subject メールの題名
   * @param text メールの内容本文
   */
  public async send(to: string, from: string, subject: string, text: string): Promise<void> {
    try {
      // リセットメール
      const msg = { to, from, subject, text }
      sendgrid.setApiKey(this.envLib.getSendGridApiKey())
      await Promise.all([sendgrid.send(msg)])
    } catch (e) {
      console.log(e)
      throw new Error('メールが送れませんでした')
    }
  }

  static builder(envLib: IEnvLibExternal): IMailExternal {
    return new this(envLib)
  }
}
