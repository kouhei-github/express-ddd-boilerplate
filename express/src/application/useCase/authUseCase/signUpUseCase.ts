import {IUserRepository} from "../../../domain/repositories/userRepositoryInterface";
import {IResponse} from "../index";
import {ISecurityService} from "../external/jwtTokenExternal";
import {Password} from "../../../domain/models/userModel/password";
import {Email} from "../../../domain/models/userModel/email";

export class SignUpUseCase
{
    constructor(private ur: IUserRepository, private se: ISecurityService) {
    }

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
