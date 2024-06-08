export class Session
{
    private readonly token: string
    constructor(token: string|null) {
        if (token === null){
            this.token = ""
            return
        }
        if (token === "") throw new Error("token is required")

        this.token = token
    }

    public getValue(): string
    {
        return this.token
    }
}