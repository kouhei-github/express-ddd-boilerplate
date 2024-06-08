
export class Email
{
    constructor(private readonly email: string)
    {
        // 入力されていなかったら
        if(email === "") {
            throw new Error("Email is required")
        }
        // 長すぎたらたらだったら
        const maxLength = 254
        if (email.length > maxLength) {
            throw new Error(`Emailは${maxLength}以下で入力してください`)
        }
        // @が含んでいないなら
        if (!email.includes("@")){
            throw new Error("メールアドレスには「@」が１つだけ含まれている必要があります。")
        }
        const splitEmail = email.split("@")
        const localPart = splitEmail[0]
        const domainPart = splitEmail[1]

        // The local part is at least 1 character and no more than 64 characters
        const minimumLength = 1
        const maximumLength = 64
        if (localPart.length < minimumLength || maximumLength < localPart.length) {
            throw new Error(`「@」の前は${minimumLength}文字以上${maximumLength}文字以下で入力してください。`)
        }

        // The local part consists of alphanumeric and period
        let isValid = /^[\w.]+$/.test(localPart);
        if (!isValid) {
            throw new Error("「@」の前は半角英数字、ピリオドのみで入力してください。")
        }

        // The local part does not start with a period
        if (localPart.startsWith(".")) {
            throw new Error("「@」の前の先頭にピリオドは使用できません。")
        }

        // The local part does not end with a period
        if (localPart.endsWith(".")) {
            throw new Error("「@」の前の末尾にピリオドは使用できません。")
        }

        // The local part does not use consecutive periods
        if (localPart.includes("..")) {
            throw new Error("「@」の前でピリオドは連続して使用できません。")
        }

        // The domain part is in the form of a domain
        isValid = /^[a-zA-Z0-9-]{1,63}(\.[a-zA-Z0-9-]{1,63})*\.[a-zA-Z]{2,}$/.test(domainPart);
        if (!isValid) {
            throw new Error("「@」の後はドメインの形式で入力してください。")
        }

        this.email = email
    }

    public getValue(): string
    {
        return this.email
    }
}