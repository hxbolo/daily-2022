import { camelize, toHandlerKey } from '../shared/index'
export function emit(instance, event, ...args) {
  console.log('emit---', event)

  // instance.props => event

  const { props } = instance

  // TPP  先写特定的行为-》 通用



  const handlerName = toHandlerKey(camelize(event))
  const handler = props[handlerName]
  handler && handler(...args)
}
