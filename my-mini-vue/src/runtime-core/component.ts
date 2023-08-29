export function creatComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
  }
  return component
}

export function setupComponent(instance) {
  // initProps()
  // initSlots()

  // 初始化一个有状态的component
  setupStatefulComponen(instance)
}

function setupStatefulComponen(instance: any) {
  const Component = instance.type

  const { setup } = Component
  if (setup) {
    const setupResult = setup()
    handleSetupResult(instance, setupResult)
  }
}

function handleSetupResult(instance, setupResult: any) {
  // function  obj

  // object
  if (typeof setupResult === 'object') {
    instance.setupState = setupResult
  }

  // 保证组件render有值
  finishComponentSetup(instance)
}

// 保证组件render有值  设置render
function finishComponentSetup(instance: any) {
  const Component = instance.type
  instance.render = Component.render
}
