import { shallowReadonly, isReadonly, readonly } from '../reactive'

describe('shallowReadonly', () => {
  // shallowReadonly ：创建一个浅层只读代理对象。这意味着该代理对象会使对象的所有属性变为只读，但不会递归地将嵌套对象的属性变为只读。换句话说，嵌套对象的属性仍然可以被修改。
  it('should not make non-reactive propertise ractive', () => {
    const prop = shallowReadonly({ n: { foo: 2 } })

    expect(isReadonly(prop)).toBe(true)
    expect(isReadonly(prop.n)).toBe(false)
  })
  
  // 当调用set时，给出警告
  it('warn then call set', () => {
    console.warn = jest.fn()

    const user = readonly({ age: 10 })

    user.age = 12

    expect(console.warn).toBeCalled()
  })
})
