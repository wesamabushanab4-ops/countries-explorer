type PageHeaderProps = {
  kicker: string
  title: string
  description: string
  variant: 'history' | 'favorites' | 'about'
}

const artwork: Record<PageHeaderProps['variant'], { label: string; icon: string }> = {
  history: { label: 'RECENT', icon: 'M12 8v4l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' },
  favorites: { label: 'SAVED', icon: 'm12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z' },
  about: { label: 'EXPLORE', icon: 'M12 16v.01M12 8v5m9-1a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' },
}

export default function PageHeader({ kicker, title, description, variant }: PageHeaderProps) {
  const visual = artwork[variant]

  return (
    <header className="page-heading inner-page-heading">
      <div>
        <p className="section-kicker">{kicker}</p>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </div>
      <div className={`page-orb page-orb-${variant}`} aria-hidden="true">
        <span className="page-orb-ring page-orb-ring-back" />
        <span className="page-orb-ring page-orb-ring-front" />
        <span className="page-orb-core">
          <svg viewBox="0 0 24 24" fill="none">
            <path d={visual.icon} />
          </svg>
        </span>
        <span className="page-orb-label">{visual.label}</span>
      </div>
    </header>
  )
}
