import React from 'react'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import Input from './index'
import Context from '~/presentation/contexts/form'

function makeSut (): RenderResult {
  const sut = render(
    <Context.Provider value={{ state: {} }}>
      <Input name="field" />
    </Context.Provider>
  )
  return sut
}

describe('Input Component', () => {
  it('Should begin with readOnly', () => {
    const sut = makeSut()
    const input = sut.getByTestId('field') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })

  it('Should remove readOnly on focus', () => {
    const sut = makeSut()
    const input = sut.getByTestId('field') as HTMLInputElement
    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })
})
