export const extend = Object.assign

export const isObject = (val) => {
  return val !== null && typeof val === 'object'
}

// 是否相同
export const hasChanged = (val, newValue) => {
  return !Object.is(val, newValue)
}
