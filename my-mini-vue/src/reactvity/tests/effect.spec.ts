import { effect, stop } from '../effect'
import { reactive } from '../reactive'
describe('effect', () => {
  it('happy path', () => {
    const usre = reactive({ age: 10 })

    let nextAge
    effect(() => {
      nextAge = usre.age + 1
    })
    expect(nextAge).toBe(11)

    // 更新
    usre.age++
    expect(nextAge).toBe(12)
  })

  // 调用effect返回回调 runner
  it('should retrun runner when call efect', () => {
    let foo = 10
    const runner = effect(() => {
      foo++
      return 'foo'
    })
    expect(foo).toBe(11)

    const r = runner()

    expect(foo).toBe(12)
    expect(r).toBe('foo')
  })

  // effect.scheduler [用于控制副作用的执行时机]
  // effect 函数的 scheduler 属性允许您自定义副作用的调度方式
  it('scheduler', () => {
    // 1. 通过effect第二个参数为 scheduler的fn
    // 2. effect第一次执行的时候 ，会执行fn
    // 3. 当响应式对象set  update不会执行fn 而是执行scheduler的fn
    // 4. 如果当执行 runner 的时候会再次执行fn
    let dummy
    let run
    const scheduler = jest.fn(() => {
      run = runner
    })
    const obj = reactive({ foo: 1 })
    const runner = effect(
      () => {
        dummy = obj.foo
      },
      { scheduler }
    )

    expect(scheduler).not.toHaveBeenCalled()
    expect(dummy).toBe(1)

    obj.foo++

    // 验证函数被调用了1次
    expect(scheduler).toHaveBeenCalledTimes(1)
    expect(dummy).toBe(1)

    run()
    expect(dummy).toBe(2)
  })

  it('stop', () => {
    let dummy
    const obj = reactive({ prop: 1 })
    const runner = effect(() => {
      dummy = obj.prop
    })
    obj.prop = 2
    expect(dummy).toBe(2)
    stop(runner)
    // obj.prop = 3

    // 修改为 obj.prop++
    //  obj.prop = obj.prop + 1   会涉及到 get 和 set  
    obj.prop++
    expect(dummy).toBe(2)

    // 调用runner 就会更新
    runner()
    expect(dummy).toBe(3)
  })
  // 调用stop之后的第二个参数， 允许用户做额外的处理
  it('onStop', () => {
    const obj = reactive({ foo: 1 })
    const onStop = jest.fn()
    let dummy
    const runner = effect(
      () => {
        dummy = obj.foo
      },
      { onStop }
    )
    stop(runner)
    expect(onStop).toBeCalledTimes(1)
  })
})
