export interface Validation {
  validate: (fieldName: string, input: string) => string | null
}
