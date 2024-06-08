import {IUserRepository} from "../../../domain/repositories/userRepositoryInterface";
import {IResponse} from "../index";

export class AllUserUseCase
{
    constructor(private ur: IUserRepository) {
    }

    public async execute(): Promise<IResponse>
    {
        // Userの取得
        const users = await this.ur.findAllUser()

        return {data: users, status: 200, message: "取得できました"}
    }

    static builder(ur: IUserRepository): AllUserUseCase
    {
        return new this(ur)
    }
}