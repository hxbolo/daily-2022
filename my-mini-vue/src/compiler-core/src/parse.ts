import { NodeTypes } from './ast'
const enum TagType {
  Start,
  End,
}
export function baseParse(content: string) {
  const context = CreatPaeserContext(content)
  return creatRoot(parseChildren(context))
}

function parseChildren(context) {
  const nodes: any = []

  let node

  const s = context.source
  // 看看如果是 {{ 开头的话，那么就是一个插值， 那么去解析他
  if (s.startsWith('{{')) {
    node = parseInterpolation(context)
  } else if (s[0] === '<') {
    if (/[a-z]/i.test(s[1])) {
      node = parseElement(context)
    }
  }
  nodes.push(node)
  return nodes
}

function parseElement(context: any) {
  // 应该如何解析 tag 呢
  // <div></div>

  const element = parseTag(context, TagType.Start)

  parseTag(context, TagType.End)

  console.log(context.source)

  return element
}

function parseTag(context, type: TagType) {
  // 1. 先解析开始 tag

  const match: any = /^<\/?([a-z][^\r\n\t\f />]*)/i.exec(context.source)

  const tag = match[1]

  console.log(match)

  addvanceBy(context, match[0].length)
  addvanceBy(context, 1)

  if(type === TagType.End)return

  // 2. 删除处理完成的代码
  return {
    type: NodeTypes.ELEMENT,
    tag,
  }
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
