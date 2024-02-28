export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly password: string,
    public readonly last_login: Date,
  ) {}

  public static create(
    id: string,
    name: string,
    password: string,
    last_login: Date,
  ): UserEntity {
    return new UserEntity(id, name, password, last_login);
  }

  //create a method that validate password
  public validatePassword(password: string): boolean {
    return this.password === password;
  }
}