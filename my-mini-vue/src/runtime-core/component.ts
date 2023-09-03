
import { shallowReadonly } from '../reactvity/reactive'
import { emit } from './componentEmit'
import { initProps } from './componentProps'
import { PublicInstanceProxyHandlers } from './componentPublicInstance'
import { initSlots } from './componentSlots'

export function creatComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    props: {},
    slots:{},
    emit:() =>{}
  }
  component.emit = emit.bind(null, component) as any
  return component
}

export function setupComponent(instance) {

  initProps(instance, instance.vnode.props)
  initSlots(instance, instance.vnode.children)

  // 初始化一个有状态的component
  setupStatefulComponen(instance)
}

function setupStatefulComponen(instance: any) {
  const Component = instance.type

  // 初始化

  // ctx
  instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers)

  const { setup } = Component
  if (setup) {
    const setupResult = setup(shallowReadonly(instance.props), {emit: instance.emit})
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
