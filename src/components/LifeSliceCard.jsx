import { DemoBadge } from './DemoBadge.jsx'
import { formatDateCompact, initialOf } from '../lib/format.js'

/**
 * 生活切片：留言卡片。
 */
export function LifeSliceCard({ slice }) {
  return (
    <article className="card">
      <div className="card__body">
        <div className="slice-card__head">
          <span className="avatar" aria-hidden="true">
            {initialOf(slice.author)}
          </span>
          <span>
            <span className="slice-card__author">{slice.author}</span>
            <br />
            <span className="slice-card__time">
              <time dateTime={slice.createdAt}>
                {formatDateCompact(slice.createdAt)}
              </time>
            </span>
          </span>
          <span style={{ marginLeft: 'auto' }}>
            <span className="tag tag--plain">{slice.category}</span>
          </span>
        </div>

        <p className="slice-card__body">{slice.content}</p>

        {slice.isDemo ? (
          <div className="card__footer" style={{ color: 'var(--color-text-muted)' }}>
            <DemoBadge />
          </div>
        ) : null}
      </div>
    </article>
  )
}
