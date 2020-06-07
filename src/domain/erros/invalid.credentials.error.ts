export class InvalidCredentialsError extends Error {
  constructor () {
    super('Credenciais Invalidas')
    this.name = 'InvalidCredentialsError'
  }
}
