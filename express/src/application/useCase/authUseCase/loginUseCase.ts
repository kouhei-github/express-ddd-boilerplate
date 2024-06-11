import {IResponse} from "../index";
import {ISecurityService} from "../../../domain/interface/externals/jwtTokenExternal";
import {Email} from "../../../domain/models/userModel/email";
import {Password} from "../../../domain/models/userModel/password";
import {IUserRepository} from "../../../domain/interface/repositories/userRepositoryInterface";

export class LoginUseCase
{
    /**
     *
     * @param ur {IUserRepository} - The user repository to be used for data access operations
     * @param se {ISecurityService} - The security service to be used for authentication and authorization
     */
    constructor(private ur: IUserRepository, private se: ISecurityService) {
    }

    /**
     * Executes the authentication process using the given email and password.
     *
     * @param {string} email - The email address of the user.
     * @param {string} password - The password of the user.
     *
     * @return {Promise<IResponse>} A promise that resolves to an object representing the response of the authentication process. The object has the following properties:
     * - data: The email address of the user.
     * - status: The status code indicating the result of the authentication process.
     * - message: A message describing the result of the authentication process.
     */
    public async execute(
        email: string,
        password: string
    ): Promise<IResponse>
    {
        const emailVo = new Email(email)
        const passwordVo = new Password(password)

        const existUser = await this.ur.findUserByEmail(emailVo.getValue())
        if (existUser === null){
            return {data: "", status: 400, message: "すでに存在するメールアドレスです"}
        }

        // ハッシュ化する
        const hashPassword = this.se.authentication(existUser.salt, passwordVo.getValue())

        // 入力されたパスワードのハッシュ値とDBのハッシュ値が正しいか確認
        if (hashPassword !== existUser.password) {
            return {data: "パスワード", status: 400, message: "パスワードが正しくありません"}
        }

        // session tokenの変更
        const salt = this.se.random()
        existUser.sessionToken = this.se.authentication(salt, existUser.id.toString())

        // session tokenをheaderに保存
        await this.ur.update(existUser)

        const response: Omit<typeof existUser, "password"|"salt">= {
            id: existUser.id,
            email: existUser.email,
            sessionToken: existUser.sessionToken,
        }

        return {data: response, status: 201, message: "登録できました"}
    }

    /**
     * Creates a new instance of the Builder class.
     *
     * @param {IUserRepository} ur - The user repository object.
     * @param {ISecurityService} se - The security service object.
     *
     * @return {LoginUseCase} - The newly created Builder object.
     */
    static builder(ur: IUserRepository, se: ISecurityService): LoginUseCase
    {
        return new this(ur, se)
    }
}