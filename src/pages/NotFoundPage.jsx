import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="page">
      <div className="container container--narrow">
        <p className="eyebrow">404</p>
        <h1 className="page-header__title">这个页面不存在</h1>
        <p className="lede" style={{ marginTop: 'var(--space-4)' }}>
          可能是链接输错了，或者这篇文章还没有发布。
        </p>
        <div className="hero__actions">
          <Link className="btn btn--primary" to="/">
            回到首页
          </Link>
          <Link className="btn btn--ghost" to="/reading">
            去共读档案
          </Link>
        </div>
      </div>
    </div>
  )
}
