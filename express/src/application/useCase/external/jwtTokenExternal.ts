export interface ISecurityService {
    authentication(salt: string, password: string): string
    random(): string
}
