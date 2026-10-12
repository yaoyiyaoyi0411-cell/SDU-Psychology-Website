import { Link, useParams } from 'react-router-dom'
import { ArticleBody } from '../components/ArticleBody.jsx'
import { DemoBadge } from '../components/DemoBadge.jsx'
import { ErrorState, LoadingState } from '../components/LoadingState.jsx'
import { getReadingNote } from '../lib/content.js'
import { useContent } from '../lib/useContent.js'
import { formatDate } from '../lib/format.js'

export function ReadingNotePage() {
  const { noteId } = useParams()
  const { data: note, loading, error } = useContent(
    () => getReadingNote(noteId),
    [noteId],
  )

  if (loading) {
    return (
      <div className="page">
        <div className="container container--narrow">
          <LoadingState />
        </div>
      </div>
    )
  }

  if (error || !note) {
    return (
      <div className="page">
        <div className="container container--narrow">
          <ErrorState message="没有找到这篇笔记。" />
          <p style={{ marginTop: 'var(--space-5)' }}>
            <Link className="btn btn--ghost" to="/reading">
              ← 返回共读档案
            </Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="container container--narrow">
        <Link className="back-link" to="/reading">
          ← 返回共读档案
        </Link>

        <header className="article-header">
          <p className="eyebrow">共读档案</p>
          <h1 className="article-header__title">{note.title}</h1>
          <p className="article-header__book">
            {note.book} · {note.author}
          </p>
          <div className="page-header__meta">
            <span className="card__meta">
              更新于 <time dateTime={note.updatedAt}>{formatDate(note.updatedAt)}</time>
            </span>
            {note.isDemo ? <DemoBadge /> : null}
          </div>
          <div className="tag-row" style={{ marginTop: 'var(--space-4)' }}>
            {note.tags.map((tag, index) => (
              <span
                key={tag}
                className={index === 0 ? 'tag' : 'tag tag--secondary'}
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <ArticleBody blocks={note.body} />

        <div className="pager">
          <Link to="/reading">← 浏览更多笔记</Link>
          <Link to="/life">去生活切片看看 →</Link>
        </div>
      </div>
    </div>
  )
}
