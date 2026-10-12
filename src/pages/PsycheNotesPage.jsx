import { PageHeader } from '../components/PageHeader.jsx'
import { PsycheCard } from '../components/PsycheCard.jsx'
import { ErrorState, LoadingState } from '../components/LoadingState.jsx'
import { useContent } from '../lib/useContent.js'
import { listPsycheCards } from '../lib/content.js'

export function PsycheNotesPage() {
  const { data: cards, loading, error } = useContent(() => listPsycheCards(), [])

  return (
    <div className="page">
      <div className="container">
        <PageHeader
          eyebrow="栏目 03"
          title="心理便利贴"
          description="把心理学概念写成人话。每张便利贴包含英文术语、简短解释、生活案例与延伸思考，点击卡片可以看到详细介绍和文献来源。"
        >
          <span className="card__meta">共 {cards ? cards.length : 0} 张示例卡片</span>
        </PageHeader>

        <div className="notice" style={{ marginBottom: 'var(--space-6)' }}>
          <span className="notice__title">内容标准</span>
          这一栏只收录有同行评议研究支持、并被后续研究反复检验过的结论。
          对于存在争议或效应量较小的发现，我们在「延伸思考」中会直接写出来，
          而不是把它包装成确定不变的结论。
        </div>

        {loading ? <LoadingState /> : null}
        {error ? <ErrorState /> : null}

        <div className="grid grid--3">
          {(cards ?? []).map((card) => (
            <PsycheCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  )
}
