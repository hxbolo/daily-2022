import { NodeTypes } from './ast'

export function baseParse(content: string) {
  const context = CreatPaeserContext(content)
  return creatRoot(parseChildren(context))
}

function parseChildren(context) {
  const nodes: any = []

  let node
  // 看看如果是 {{ 开头的话，那么就是一个插值， 那么去解析他
  if (context.source.startsWith('{{')) {
    node = parseInterpolation(context)
  }
  nodes.push(node)
  return nodes
}
//解析差值
function parseInterpolation(context) {
  // {{message}}

  // 获取 }} 位置

  const openDelimiter = '{{'
  const closeDelimiter = '}}'
  const closeIndex = context.source.indexOf(
    closeDelimiter,
    closeDelimiter.length
  )
  // 让代码前进2个长度，可以把 {{ 干掉
  addvanceBy(context, openDelimiter.length)

  const rawContentLength = closeIndex - openDelimiter.length

  // 获取都中间内容
  const rawContent = context.source.slice(0, rawContentLength)
  const content = rawContent.trim()

  // 最后在让代码前进2个长度，可以把 }} 干掉
  addvanceBy(context, rawContentLength + closeDelimiter.length)

  console.log('source', context.source, content, closeIndex)

  return {
    type: NodeTypes.INTERPOLATION,
    content: {
      type: NodeTypes.SIMPLE_EXPRESSION,
      content: content,
    },
  }
}

function addvanceBy(context, numberOfCharacters) {
  context.source = context.source.slice(numberOfCharacters)
}

// 根节点
function creatRoot(children) {
  return {
    children,
  }
}

function CreatPaeserContext(content: string): any {
  return {
    source: content,
  }
}
