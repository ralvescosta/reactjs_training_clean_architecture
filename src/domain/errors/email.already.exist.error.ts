export class EmailAlreadyExistError extends Error {
  constructor () {
    super('Esse e-mail esta em uso')
    this.name = 'EmailAlreadyExistError'
  }
}
