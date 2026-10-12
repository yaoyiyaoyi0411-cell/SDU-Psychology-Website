import { Outlet } from 'react-router-dom'
import { ScrollToTop } from './ScrollToTop.jsx'
import { SiteHeader } from './SiteHeader.jsx'
import { SiteFooter } from './SiteFooter.jsx'

/**
 * 网站整体骨架：页头 + 页面内容 + 页脚。
 */
export function Layout() {
  return (
    <div className="site-shell">
      <ScrollToTop />
      <SiteHeader />
      <main className="site-main">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
