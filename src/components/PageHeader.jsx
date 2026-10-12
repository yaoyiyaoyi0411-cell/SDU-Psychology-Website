import { DemoBadge } from './DemoBadge.jsx'

/**
 * 栏目页统一的标题区。
 */
export function PageHeader({ eyebrow, title, description, showDemo = true, children }) {
  return (
    <div className="page-header">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1 className="page-header__title">{title}</h1>
      {description ? <p className="lede">{description}</p> : null}
      <div className="page-header__meta">
        {showDemo ? <DemoBadge /> : null}
        {children}
      </div>
    </div>
  )
}
