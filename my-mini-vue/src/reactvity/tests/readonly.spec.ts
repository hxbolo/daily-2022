import { readonly, isReadonly, isProxy } from '../reactive'

describe('readonly', () => {
  it('happy path', () => {
    const original = { foo: 1, bar: { baz: 2 } }
    //  readonly  不可被改写，只读  无set
    const warpped = readonly(original)

    expect(warpped).not.toBe(original)
    expect(warpped.foo).toBe(1)
    expect(isReadonly(warpped)).toBe(true)
    expect(isProxy(warpped)).toBe(true)

  })

  // 当调用set时，给出警告
  it('warn then call set', () => {
    console.warn = jest.fn()

    const user = readonly({ age: 10 })

    user.age = 12

    expect(console.warn).toBeCalled()
  })
})
