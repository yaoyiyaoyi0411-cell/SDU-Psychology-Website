import { Link, useParams } from 'react-router-dom'
import { ArticleBody } from '../components/ArticleBody.jsx'
import { DemoBadge } from '../components/DemoBadge.jsx'
import { ErrorState, LoadingState } from '../components/LoadingState.jsx'
import { getPsycheCard } from '../lib/content.js'
import { useContent } from '../lib/useContent.js'

export function PsycheNotePage() {
  const { cardId } = useParams()
  const { data: card, loading, error } = useContent(
    () => getPsycheCard(cardId),
    [cardId],
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

  if (error || !card) {
    return (
      <div className="page">
        <div className="container container--narrow">
          <ErrorState message="没有找到这张便利贴。" />
          <p style={{ marginTop: 'var(--space-5)' }}>
            <Link className="btn btn--ghost" to="/psyche">
              ← 返回心理便利贴
            </Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="container container--narrow">
        <Link className="back-link" to="/psyche">
          ← 返回心理便利贴
        </Link>

        <header className="article-header">
          <p className="eyebrow">{card.term}</p>
          <h1 className="article-header__title">{card.name}</h1>
          <p className="lede" style={{ marginTop: 'var(--space-4)' }}>
            {card.summary}
          </p>
          <div className="page-header__meta">
            {card.isDemo ? <DemoBadge /> : null}
          </div>
        </header>

        <div className="grid grid--2" style={{ marginBottom: 'var(--space-7)' }}>
          <div className="card">
            <div className="card__body">
              <p className="psyche-card__field-label">生活案例</p>
              <p className="card__summary">{card.example}</p>
            </div>
          </div>
          <div className="card">
            <div className="card__body">
              <p className="psyche-card__field-label">延伸思考</p>
              <p className="card__summary">{card.thought}</p>
            </div>
          </div>
        </div>

        <ArticleBody blocks={card.body} />

        <section className="sources">
          <h2>资料来源</h2>
          <ol>
            {card.sources.map((source) => (
              <li key={source}>{source}</li>
            ))}
          </ol>
        </section>

        <div className="pager">
          <Link to="/psyche">← 浏览更多便利贴</Link>
          <Link to="/reading">去共读档案 →</Link>
        </div>
      </div>
    </div>
  )
}
