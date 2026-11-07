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
