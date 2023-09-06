import { getCurrentInstance } from './component'

export function provide(key, value) {
  // 存
  // 获取组件实例对像
  const currentInstance: any = getCurrentInstance()
  if (currentInstance) {
    let { provides } = currentInstance

    const parentProvides = currentInstance.parent.provides
    // 从原型上获取  改写  初始化init
    if (provides === parentProvides) {
      provides = currentInstance.provides = Object.create(parentProvides)
    }

    provides[key] = value
  }
}
export function inject(key, defaultValue) {
  // 取
  const currentInstance: any = getCurrentInstance()
  if (currentInstance) {
    const parentProvides = currentInstance.parent.provides
    console.log('parentProvides', parentProvides)
    if (key in parentProvides) {
      return parentProvides[key]
    } else if (defaultValue) {
      if (typeof defaultValue === 'function') {
        return defaultValue()
      } else {
        return defaultValue
      }
    }
  }
}
