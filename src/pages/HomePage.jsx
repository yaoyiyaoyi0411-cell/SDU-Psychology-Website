import { Link } from 'react-router-dom'
import { DemoBadge } from '../components/DemoBadge.jsx'
import { sectionEntries, siteInfo } from '../data/site.js'
import { useContent } from '../lib/useContent.js'
import { listReadingNotes, listLifeSlices, listPsycheCards } from '../lib/content.js'
import { formatDateCompact } from '../lib/format.js'

export function HomePage() {
  const { data: notes } = useContent(() => listReadingNotes(), [])
  const { data: slices } = useContent(() => listLifeSlices(), [])
  const { data: cards } = useContent(() => listPsycheCards(), [])

  const latestNote = notes?.[0] ?? null
  const latestSlice = slices?.[0] ?? null

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div>
            <p className="eyebrow">{siteInfo.organizer}</p>
            <h1 className="hero__title">
              这里是<em>心协学术空间</em>
              <br />
              一个持续更新的公共书架
            </h1>
            <p className="lede">{siteInfo.intro}</p>
            <div className="hero__actions">
              <Link className="btn btn--primary" to="/reading">
                从共读档案读起
              </Link>
              <Link className="btn btn--ghost" to="/life">
                去生活切片看看
              </Link>
            </div>
          </div>

          <aside className="hero__note">
            <p>
              本站目前是<strong>第一版演示站点</strong>。
              页面上的读书笔记、留言与概念卡片都是示例内容，
              用来展示版式和功能，不代表真实投稿或正式发布。
            </p>
            <p style={{ marginTop: 'var(--space-4)' }}>
              投稿功能尚未接入服务器：你可以填写表单并在本地预览自己的文字，
              但内容不会发送到任何地方。
            </p>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">三个栏目</p>
          <div className="grid grid--3">
            {sectionEntries.map((entry) => (
              <Link key={entry.to} to={entry.to} className="entry-card">
                <span className="entry-card__index">{entry.index}</span>
                <h2 className="entry-card__title">{entry.title}</h2>
                <p className="entry-card__desc">{entry.description}</p>
                <span className="entry-card__more">进入栏目 →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">最近更新</p>
          <div className="grid grid--2">
            <div className="card">
              <div className="card__body">
                <p className="card__meta">
                  <span>共读档案</span>
                  {latestNote ? (
                    <time dateTime={latestNote.updatedAt}>
                      {formatDateCompact(latestNote.updatedAt)}
                    </time>
                  ) : null}
                </p>
                {latestNote ? (
                  <>
                    <h2 className="card__title">
                      <Link to={`/reading/${latestNote.id}`}>{latestNote.title}</Link>
                    </h2>
                    <p className="article-header__book" style={{ fontSize: 'var(--text-sm)' }}>
                      {latestNote.book}
                    </p>
                    <p className="card__summary">{latestNote.summary}</p>
                  </>
                ) : (
                  <p className="card__summary">暂无内容。</p>
                )}
                <div className="card__footer">
                  <Link to="/reading">查看全部笔记 →</Link>
                  <DemoBadge />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card__body">
                <p className="card__meta">
                  <span>生活切片</span>
                  {latestSlice ? (
                    <time dateTime={latestSlice.createdAt}>
                      {formatDateCompact(latestSlice.createdAt)}
                    </time>
                  ) : null}
                </p>
                {latestSlice ? (
                  <>
                    <h2 className="card__title">{latestSlice.author}的分享</h2>
                    <p className="slice-card__body">{latestSlice.content}</p>
                  </>
                ) : (
                  <p className="card__summary">暂无内容。</p>
                )}
                <div className="card__footer">
                  <Link to="/life">浏览留言墙 →</Link>
                  <DemoBadge />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid--3" style={{ marginTop: 'var(--space-6)' }}>
            {(cards ?? []).slice(0, 3).map((card) => (
              <Link key={card.id} to={`/psyche/${card.id}`} className="card">
                <div className="card__body">
                  <p className="psyche-card__term">{card.term}</p>
                  <h2 className="card__title">{card.name}</h2>
                  <p className="card__summary">{card.summary}</p>
                  <div className="card__footer">
                    <span>查看便利贴 →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <p className="eyebrow">关于内容</p>
          <h2 className="page-header__title" style={{ fontSize: 'var(--text-2xl)' }}>
            我们怎么写，也怎么标注
          </h2>
          <div className="prose" style={{ marginTop: 'var(--space-5)' }}>
            <p>
              心理便利贴里的每一张卡片，都只写有同行评议研究支持、
              并且被后续研究反复检验过的内容，并列出可查证的文献。
            </p>
            <p>
              对于存在争议、效应量较小或方法学上有争议的结论，
              我们会在「延伸思考」里直接说明，而不是把它写成确定的结论。
            </p>
            <p>
              共读档案里的笔记是个人阅读记录，包含主观理解和感受，
              与便利贴的定位不同，阅读时请留意这个区别。
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
