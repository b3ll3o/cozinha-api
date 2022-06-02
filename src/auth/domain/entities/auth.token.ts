export class AuthToken {
  constructor(
    readonly id: string,
    readonly sub: number,
    readonly email: string,
  ) {}
}
