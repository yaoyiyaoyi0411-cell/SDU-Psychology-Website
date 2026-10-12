import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navigation, siteInfo } from '../data/site.js'
import { BrandMark } from './BrandMark.jsx'

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link
          to="/"
          className="brand"
          onClick={() => setMenuOpen(false)}
          aria-label={`${siteInfo.name} 首页`}
        >
          <BrandMark />
          <span className="brand__text">
            <span className="brand__name">{siteInfo.name}</span>
            <span className="brand__sub">{siteInfo.organizer}</span>
          </span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? '收起菜单' : '栏目菜单'}
        </button>

        <nav
          id="site-nav"
          className={menuOpen ? 'site-nav is-open' : 'site-nav'}
          aria-label="主导航"
        >
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? 'site-nav__link is-active' : 'site-nav__link'
              }
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
