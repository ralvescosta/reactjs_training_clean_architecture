export class MinLengthError extends Error {
  constructor () {
    super('Conteudo é menor do que o requerido')
    this.name = 'MinLengthError'
  }
}
