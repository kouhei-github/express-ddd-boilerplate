import {IUserRepository} from "../../../domain/interface/repositories/userRepositoryInterface";
import {IResponse} from "../index";

export class AllUserUseCase
{
    /**
     * Creates a new instance of the constructor.
     *
     * @param {IUserRepository} ur - The IUserRepository instance to be used.
     */
    constructor(private ur: IUserRepository) {
    }

    /**
     * Executes the method to retrieve users.
     *
     * @returns {Promise<IResponse>} A Promise that resolves with the response containing user data, status code, and a success message.
     */
    public async execute(): Promise<IResponse>
    {
        // Userの取得
        const users = await this.ur.findAllUser()

        return {data: users, status: 200, message: "取得できました"}
    }

    /**
     * Builds an instance of AllUserUseCase using the provided IUserRepository.
     *
     * @param {IUserRepository} ur - The user repository to be used in the AllUserUseCase.
     * @returns {AllUserUseCase} - An instance of AllUserUseCase.
     */
    static builder(ur: IUserRepository): AllUserUseCase
    {
        return new this(ur)
    }
}