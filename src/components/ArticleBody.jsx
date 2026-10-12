/**
 * 把数据里的段落数组渲染成正文。
 *
 * 约定的写法很轻量，不需要额外的编辑器工具：
 *   '## 小标题'   →  二级标题
 *   '> 引文'      →  引文块
 *   '- 列表项'    →  列表
 *   其他          →  普通段落
 *
 * 段落内部可以用 **粗体** 标记重点。
 */

function renderInline(text) {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>
    }
    return <span key={index}>{part}</span>
  })
}

export function ArticleBody({ blocks = [], className = 'article-body' }) {
  const elements = []
  let listBuffer = []

  const flushList = () => {
    if (listBuffer.length === 0) return
    elements.push(
      <ul key={`list-${elements.length}`}>
        {listBuffer.map((item, index) => (
          <li key={index}>{renderInline(item)}</li>
        ))}
      </ul>,
    )
    listBuffer = []
  }

  blocks.forEach((raw) => {
    const line = String(raw ?? '').trim()
    if (!line) return

    if (line.startsWith('## ')) {
      flushList()
      elements.push(<h2 key={`h2-${elements.length}`}>{line.slice(3)}</h2>)
      return
    }

    if (line.startsWith('> ')) {
      flushList()
      elements.push(
        <blockquote key={`quote-${elements.length}`}>
          {renderInline(line.slice(2))}
        </blockquote>,
      )
      return
    }

    if (line.startsWith('- ')) {
      listBuffer.push(line.slice(2))
      return
    }

    flushList()
    elements.push(<p key={`p-${elements.length}`}>{renderInline(line)}</p>)
  })

  flushList()

  return <div className={className}>{elements}</div>
}
