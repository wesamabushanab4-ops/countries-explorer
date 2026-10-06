import { NavLink } from 'react-router-dom'
import { useTranslation } from '../i18n'

type NavbarProps = {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const { language, setLanguage, t } = useTranslation()
  const links = [
    { to: '/', label: t('countries'), end: true },
    { to: '/history', label: t('history') },
    { to: '/favorites', label: t('favorites') },
    { to: '/about', label: t('about') },
  ]

  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink className="brand" to="/" aria-label={t('homeLabel')}>
          <span className="brand-mark" aria-hidden="true">◉</span>
          <span>atlas<span className="brand-accent">.</span></span>
        </NavLink>
        <nav className="main-nav" aria-label={t('mainNav')}>
          {links.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <label className="language-picker">
            <span className="visually-hidden">{t('switchLanguage')}</span>
            <select value={language} onChange={(event) => setLanguage(event.target.value as typeof language)} aria-label={t('switchLanguage')}>
              <option value="en">English</option>
              <option value="he">עברית</option>
              <option value="ar">العربية</option>
            </select>
          </label>
          <button
            className="theme-toggle"
            type="button"
            onClick={onToggleTheme}
            aria-label={`${theme === 'light' ? t('darkMode') : t('lightMode')}`}
            title={theme === 'light' ? t('darkMode') : t('lightMode')}
          >
            <span aria-hidden="true">{theme === 'light' ? '☾' : '☀'}</span>
            <span>{theme === 'light' ? t('darkMode') : t('lightMode')}</span>
          </button>
          <div className="header-note"><span className="status-dot" /> {t('worldGuide')}</div>
        </div>
      </div>
    </header>
  )
}
