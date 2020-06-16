export class InvalidEmailField extends Error {
  constructor () {
    super('Email informado esta no formato errado')
    this.name = 'InvalidEmailField'
  }
}
