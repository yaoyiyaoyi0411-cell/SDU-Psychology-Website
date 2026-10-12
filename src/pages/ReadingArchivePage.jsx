import { useMemo, useState } from 'react'
import { PageHeader } from '../components/PageHeader.jsx'
import { ReadingNoteCard } from '../components/ReadingNoteCard.jsx'
import { LoadingState, ErrorState } from '../components/LoadingState.jsx'
import { useContent } from '../lib/useContent.js'
import { listReadingNotes } from '../lib/content.js'

export function ReadingArchivePage() {
  const { data: notes, loading, error } = useContent(() => listReadingNotes(), [])
  const [activeTag, setActiveTag] = useState('全部')

  // 从所有笔记的标签里去重，生成筛选按钮
  const tags = useMemo(() => {
    if (!notes) return ['全部']
    const all = notes.flatMap((note) => note.tags)
    return ['全部', ...Array.from(new Set(all))]
  }, [notes])

  const visibleNotes = useMemo(() => {
    if (!notes) return []
    if (activeTag === '全部') return notes
    return notes.filter((note) => note.tags.includes(activeTag))
  }, [notes, activeTag])

  return (
    <div className="page">
      <div className="container">
        <PageHeader
          eyebrow="栏目 01"
          title="共读档案"
          description="每周更新一篇读书笔记，记录我们在心理学与人文社科书目里读到的内容。可以按书籍或主题筛选。"
        >
          <span className="card__meta">
            共 {notes ? notes.length : 0} 篇示例笔记
          </span>
        </PageHeader>

        <div className="filter-bar">
          <span className="filter-bar__label">按主题筛选：</span>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={tag === activeTag ? 'chip is-active' : 'chip'}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {loading ? <LoadingState /> : null}
        {error ? <ErrorState /> : null}

        {!loading && !error && visibleNotes.length === 0 ? (
          <p className="empty">这个主题下暂时还没有笔记。</p>
        ) : null}

        <div className="grid grid--2">
          {visibleNotes.map((note) => (
            <ReadingNoteCard key={note.id} note={note} />
          ))}
        </div>
      </div>
    </div>
  )
}
