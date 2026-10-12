import { Link } from 'react-router-dom'
import { DemoBadge } from './DemoBadge.jsx'
import { formatDateCompact } from '../lib/format.js'

/**
 * 共读档案：文章卡片。
 * 显示封面、标题、书名、更新时间、摘要与标签，点击进入全文。
 */
export function ReadingNoteCard({ note }) {
  return (
    <article className="card book-card">
      <div className="book-card__cover">
        <img src={note.cover} alt={`${note.book} 封面占位图`} loading="lazy" />
      </div>

      <div className="card__body">
        <div className="card__meta">
          <time dateTime={note.updatedAt}>{formatDateCompact(note.updatedAt)}</time>
          <span>·</span>
          <span>{note.author}</span>
          {note.isDemo ? <DemoBadge /> : null}
        </div>

        <h2 className="card__title">
          <Link to={`/reading/${note.id}`}>{note.title}</Link>
        </h2>

        <p className="article-header__book" style={{ fontSize: 'var(--text-sm)' }}>
          {note.book}
        </p>

        <p className="card__summary">{note.summary}</p>

        <div className="tag-row">
          {note.tags.map((tag, index) => (
            <span
              key={tag}
              className={index === 0 ? 'tag' : 'tag tag--secondary'}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="card__footer">
          <span>阅读全文 →</span>
        </div>
      </div>
    </article>
  )
}
