import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { ReadingArchivePage } from './pages/ReadingArchivePage.jsx'
import { ReadingNotePage } from './pages/ReadingNotePage.jsx'
import { LifeSlicesPage } from './pages/LifeSlicesPage.jsx'
import { LifeSliceSubmitPage } from './pages/LifeSliceSubmitPage.jsx'
import { PsycheNotesPage } from './pages/PsycheNotesPage.jsx'
import { PsycheNotePage } from './pages/PsycheNotePage.jsx'
import { NotFoundPage } from './pages/NotFoundPage.jsx'

/**
 * 路由表。
 *
 * 新增页面的方式：在 src/pages/ 下写一个页面组件，
 * 然后在这里加一条 <Route>。
 *
 * 目前使用的是「浏览器地址」路由（例如 /reading/xxx）。
 * 部署到 Cloudflare Pages 时，public/_redirects 已经处理好了刷新与直达，
 * 不需要额外配置。
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route path="reading" element={<ReadingArchivePage />} />
          <Route path="reading/:noteId" element={<ReadingNotePage />} />

          <Route path="life" element={<LifeSlicesPage />} />
          <Route path="life/submit" element={<LifeSliceSubmitPage />} />

          <Route path="psyche" element={<PsycheNotesPage />} />
          <Route path="psyche/:cardId" element={<PsycheNotePage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
