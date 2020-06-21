import { RenderResult } from '@testing-library/react'

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
