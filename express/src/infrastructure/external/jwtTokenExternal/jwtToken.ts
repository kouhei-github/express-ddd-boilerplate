import crypto from 'crypto'
import process from 'process'
import {ISecurityService} from "../../../domain/interface/externals/jwtTokenExternal";


export class SecurityExternal implements ISecurityService {
    private SECRET = process.env.SECRET_KEY_GENERATE

    authentication(salt: string, password: string): string
    {
        return crypto.createHmac("sha256", [salt, password].join("/")).update(typeof this.SECRET === "undefined" ? "" : this.SECRET ).digest("hex")
    }

    random(): string
    {
        return crypto.randomBytes(128).toString("base64")
    }
    static builder(): ISecurityService
    {
        return new this()
    }
}