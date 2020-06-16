export class RequiredFieldError extends Error {
  constructor () {
    super('Campo Obrigatorio')
    this.name = 'RequiredFieldError'
  }
}
