import { RenderResult, fireEvent } from '@testing-library/react'
import faker from 'faker'

export function testChildCount (sut: RenderResult, fieldName: string, count: number): void {
  const element = sut.getByTestId(fieldName)
  expect(element.childElementCount).toBe(count)
}

export function testButtonIsDisabled (sut: RenderResult, fieldName: string, isDisabled: boolean): void {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export function testStatusForField (sut: RenderResult, fieldName: string, validationError?: string): void {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo Certo!')
  expect(fieldStatus.textContent).toBe(validationError ? '🌑' : '💚')
}

export function populateField (sut: RenderResult, fieldName: string, value = faker.random.word()): void {
  const emailInput = sut.getByTestId(fieldName)

  fireEvent.input(emailInput, { target: { value } })
}
