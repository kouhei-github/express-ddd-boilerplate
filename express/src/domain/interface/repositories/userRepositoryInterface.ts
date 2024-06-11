import {UserDto} from "../../../infrastructure/datastore/dto/user";

export interface IUserRepository {
    createUser(data: Pick<UserDto, "email"|"password"|"salt">): Promise<UserDto>
    findUserByEmail(email: string): Promise<UserDto | null>
    findAllUser(): Promise<UserDto[]>
    findBySessionToken(token: string): Promise<UserDto|null>
    update(data: UserDto): Promise<void>
}