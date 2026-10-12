import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * 切换页面时自动回到顶部。
 * 没有这个组件的话，从长文章点进下一篇会停在页面中间。
 */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}
