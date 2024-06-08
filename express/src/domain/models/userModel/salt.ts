export class Salt
{
    private readonly salt: string
    constructor(salt: string|null) {
        if (salt === null){
            this.salt = ""
            return
        }
        if (salt === "") throw new Error("salt is required")

        this.salt = salt
    }

    public getValue(): string
    {
        return this.salt
    }
}