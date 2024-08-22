import { Email } from './email'
import { Password } from './password'
import { Salt } from './salt'

export class UserEntity {
  constructor(
    private email: Email,
    private password: Password,
    private salt: Salt,
  ) {}

  public getEmail(): string {
    return this.email.getValue()
  }

  public getPassword(): string {
    return this.password.getValue()
  }

  public getSalt(): string {
    return this.salt.getValue()
  }
}
