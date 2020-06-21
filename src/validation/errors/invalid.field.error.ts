export class InvalidFieldError extends Error {
  constructor () {
    super('Campo informado esta errado')
    this.name = 'InvalidField'
  }
}
