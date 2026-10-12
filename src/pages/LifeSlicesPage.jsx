import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader.jsx'
import { LifeSliceCard } from '../components/LifeSliceCard.jsx'
import { ErrorState, LoadingState } from '../components/LoadingState.jsx'
import { useContent } from '../lib/useContent.js'
import { listLifeSlices } from '../lib/content.js'
import { lifeCategories } from '../data/lifeSlices.js'

export function LifeSlicesPage() {
  const { data: slices, loading, error } = useContent(() => listLifeSlices(), [])
  const [activeCategory, setActiveCategory] = useState('全部')

  const visibleSlices = useMemo(() => {
    if (!slices) return []
    if (activeCategory === '全部') return slices
    return slices.filter((slice) => slice.category === activeCategory)
  }, [slices, activeCategory])

  return (
    <div className="page">
      <div className="container">
        <PageHeader
          eyebrow="栏目 02"
          title="生活切片"
          description="一块属于全校同学的留言墙。最近的经历、说不清的感受、想推荐的书影音，都可以写在这里。不限于心理健康话题。"
        >
          <Link className="btn btn--primary" to="/life/submit">
            我要投稿
          </Link>
        </PageHeader>

        <div className="notice" style={{ marginBottom: 'var(--space-6)' }}>
          <span className="notice__title">关于投稿</span>
          正式投稿功能还在开发中。目前的投稿页可以在你自己的浏览器里预览排版效果，
          但内容不会发送到服务器，也不会公开展示。
          未来投稿会先进入待审核状态，经管理员确认后才会出现在这一页。
        </div>

        <div className="filter-bar">
          <span className="filter-bar__label">按类型筛选：</span>
          {lifeCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={category === activeCategory ? 'chip is-active' : 'chip'}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? <LoadingState /> : null}
        {error ? <ErrorState /> : null}

        {!loading && !error && visibleSlices.length === 0 ? (
          <p className="empty">这个分类下暂时还没有内容。</p>
        ) : null}

        <div className="grid grid--2">
          {visibleSlices.map((slice) => (
            <LifeSliceCard key={slice.id} slice={slice} />
          ))}
        </div>
      </div>
    </div>
  )
}
