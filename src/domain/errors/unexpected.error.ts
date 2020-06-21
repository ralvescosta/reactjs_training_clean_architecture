export class UnexpectedError extends Error {
  constructor () {
    super('Algo de errado aconteceu, tente novamente em bere.')
    this.name = 'UnexpectedError'
  }
}
