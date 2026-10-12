import { Link } from 'react-router-dom'
import { DemoBadge } from './DemoBadge.jsx'

/**
 * 心理便利贴：概念卡片。
 * 卡片上给出概念名称、英文术语、简短解释、生活案例与延伸思考，
 * 点击进入详情页查看完整介绍与资料来源。
 */
export function PsycheCard({ card }) {
  return (
    <article className="card">
      <div className="card__body">
        <p className="psyche-card__term">{card.term}</p>
        <h2 className="card__title">
          <Link to={`/psyche/${card.id}`}>{card.name}</Link>
        </h2>
        <p className="card__summary">{card.summary}</p>

        <div className="psyche-card__field">
          <span className="psyche-card__field-label">生活案例</span>
          <p className="psyche-card__field-text">{card.example}</p>
        </div>

        <div className="psyche-card__field">
          <span className="psyche-card__field-label">延伸思考</span>
          <p className="psyche-card__field-text">{card.thought}</p>
        </div>

        <div className="card__footer">
          <Link to={`/psyche/${card.id}`}>查看详细介绍与来源 →</Link>
        </div>
      </div>
    </article>
  )
}
