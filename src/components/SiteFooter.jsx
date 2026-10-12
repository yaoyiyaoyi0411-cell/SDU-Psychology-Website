import { Link } from 'react-router-dom'
import { footerGroups, siteInfo } from '../data/site.js'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div>
            <h2>关于本站</h2>
            <p style={{ lineHeight: 'var(--leading-normal)' }}>
              {siteInfo.name}由{siteInfo.organizer}维护，
              用于协会内部共读记录与面向全校同学的知识分享。
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2>{group.title}</h2>
              <ul>
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.to}-${link.label}`}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="site-footer__bottom">
          <p>
            本站目前为第一版演示站点，页面上的文章、留言与卡片均为示例内容，
            用于展示版式与功能，不代表真实投稿或正式发布。
          </p>
          <p style={{ marginTop: 'var(--space-2)' }}>
            © {new Date().getFullYear()} {siteInfo.organizer}
          </p>
        </div>
      </div>
    </footer>
  )
}
