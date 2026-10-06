import { useTranslation } from '../i18n'

export default function About() {
  const { t } = useTranslation()

  return (
    <main className="page-shell inner-page about-page">
      <section className="page-intro">
        <span className="eyebrow">{t('aboutEyebrow')}</span>
        <h1>{t('meetAtlas')}<br /><em>{t('worldAtlas')}</em></h1>
        <p>{t('aboutIntro')}</p>
      </section>
      <section className="about-grid">
        <article className="about-card about-story">
          <span className="eyebrow">{t('personalAtlas')}</span>
          <h2>{t('goBeyond')}<br />{t('map')}</h2>
          <p>{t('aboutStory')}</p>
          <div className="about-stats">
            <div><strong>195+</strong><span>{t('countriesTerritories')}</span></div>
            <div><strong>4</strong><span>{t('waysExplore')}</span></div>
          </div>
          <span className="story-star" aria-hidden="true">✳</span>
        </article>
        <article className="about-card developer-card">
          <div className="developer-avatar" aria-hidden="true">WG</div>
          <span className="eyebrow">{t('developer')}</span>
          <h2>Wesam Gadban</h2>
          <p>{t('developerIntro')}</p>
          <div className="developer-caption"><span className="status-dot" /> {t('builtWith')}</div>
          <div className="developer-details">
            <span>{t('interactiveProfiles')}</span>
            <span>{t('favoritesHistory')}</span>
            <span>{t('themesFeature')}</span>
          </div>
        </article>
      </section>
      <footer className="page-footer"><span>{t('madeCurious')}</span><span>{t('builtBy')}</span></footer>
    </main>
  )
}
