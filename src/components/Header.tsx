import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { navItems } from '../data/site'
import { ArrowIcon } from './ArrowIcon'
import { Brand } from './Brand'

export function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Close the mobile menu on navigation and with Escape.
  useEffect(() => setOpen(false), [location.pathname, location.hash])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Compact bar once scrolled; slides away on the way down, returns on the way up.
  useEffect(() => {
    const root = document.documentElement
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      root.classList.toggle('header-compact', y > 40)
      if (y <= 260 || y < last - 4) root.classList.remove('header-hidden')
      else if (y > last + 4 && !open) root.classList.add('header-hidden')
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  return (
    <div className="wrap site-header">
      <header>
        <Brand />
        <nav id="nav" className={`main-nav${open ? ' open' : ''}`} aria-label="Hauptnavigation">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Link className="button" to="/kontakt/">
          Gartenprojekt besprechen
          <span className="arrow" aria-hidden="true">
            <ArrowIcon />
          </span>
        </Link>
        <button
          type="button"
          className="menubtn"
          aria-label={open ? 'Menü schliessen' : 'Menü öffnen'}
          aria-controls="nav"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </header>
    </div>
  )
}
