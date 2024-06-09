import {IUserRepository} from "../../../domain/repositories/userRepositoryInterface";
import {IResponse} from "../index";
import {ISecurityService} from "../external/jwtTokenExternal";
import {Password} from "../../../domain/models/userModel/password";
import {Email} from "../../../domain/models/userModel/email";

export class SignUpUseCase
{
    /**
     * Class constructor for creating an instance of MyClass.
     *
     * @param {IUserRepository} ur - An instance of IUserRepository.
     * @param {ISecurityService} se - An instance of ISecurityService.
     */
    constructor(private ur: IUserRepository, private se: ISecurityService) {
    }

    /**
     * Executes the registration process for a user.
     *
     * @param {string} email - The email address of the user.
     * @param {string} password - The password of the user.
     *
     * @return {Promise<IResponse>} The response object containing the result of the execution.
     * @property {string} data - The data returned from the execution.
     * @property {number} status - The status code of the execution.
     * @property {string} message - The message describing the result of the execution.
     */
    public async execute(
        email: string,
        password: string
    ): Promise<IResponse>
    {
        const emailVo = new Email(email)
        const passwordVo = new Password(password)

        const exist = await this.ur.findUserByEmail(emailVo.getValue())
        if (exist !== null){
            return {data: "", status: 400, message: "すでに存在しています"}
        }

        // パスワードのソルト
        const salt = this.se.random()
        const hashPassword = this.se.authentication(salt, passwordVo.getValue())

        const user = await this.ur.createUser({
            email,
            salt,
            password: hashPassword
        })
        return {data: user, status: 201, message: "登録できました"}
    }

    static builder(ur: IUserRepository, se: ISecurityService)
    {
        return new this(ur, se)
    }
}
