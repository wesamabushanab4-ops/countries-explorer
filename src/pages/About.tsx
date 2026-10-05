import PageHeader from '../components/PageHeader'

export default function About() {
  return (
    <section className="page-section">
      <PageHeader
        kicker="Curiosity without borders"
        title="About the explorer"
        description="A little app for a very big world."
        variant="about"
      />
      <p className="intro-text">
        Countries Explorer is a simple app that helps users discover and review key
        information about countries around the world. It combines live data from the REST
        Countries API with a lightweight history experience for quick exploration.
      </p>

      <div className="info-panel">
        <div className="developer-avatar" aria-hidden="true">WG</div>
        <div className="developer-copy">
          <span className="eyebrow">Built by</span>
          <h2>Wesam Gadban</h2>
          <p>Frontend developer focused on React and TypeScript projects.</p>
        </div>
        <span className="developer-orbit" aria-hidden="true" />
      </div>
    </section>
  )
}
