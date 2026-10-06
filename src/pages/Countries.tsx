import { useEffect, useMemo, useState } from 'react'
import CountryCard from '../components/CountryCard'
import { fetchCountryDetails, fetchCountryList } from '../api/countries'
import { localizedCountryName, localizedRegion, useTranslation } from '../i18n'
import type { CountryDetails, CountryOption, RegionFilter, SearchRecord } from '../types/Country'

interface CountriesProps {
  history: SearchRecord[]
  addHistory: (record: SearchRecord) => void
  favorites: CountryDetails[]
  toggleFavorite: (country: CountryDetails) => void
}

const regions: RegionFilter[] = ['All regions', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic']

export default function Countries({ history, addHistory, favorites, toggleFavorite }: CountriesProps) {
  const { language, t } = useTranslation()
  const [countries, setCountries] = useState<CountryOption[]>([])
  const [countriesLoading, setCountriesLoading] = useState(true)
  const [countriesError, setCountriesError] = useState('')
  const [listRetry, setListRetry] = useState(0)
  const [region, setRegion] = useState<RegionFilter>('All regions')
  const [selectedCode, setSelectedCode] = useState('')
  const [country, setCountry] = useState<CountryDetails | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    setCountriesLoading(true)
    setCountriesError('')
    fetchCountryList(controller.signal)
      .then(setCountries)
      .catch((error: unknown) => {
        if (!controller.signal.aborted) setCountriesError(error instanceof Error ? error.message : 'Failed to load countries.')
      })
      .finally(() => { if (!controller.signal.aborted) setCountriesLoading(false) })
    return () => controller.abort()
  }, [listRetry])

  const visibleCountries = useMemo(
    () => countries.filter((item) => region === 'All regions' || item.region === region),
    [countries, region],
  )

  useEffect(() => {
    if (!selectedCode) {
      setCountry(null)
      setDetailError('')
      setDetailLoading(false)
      return
    }
    const selected = countries.find((item) => item.cca2 === selectedCode)
    if (!selected) return

    const controller = new AbortController()
    setDetailLoading(true)
    setDetailError('')
    fetchCountryDetails(selected.cca2, controller.signal)
      .then((details) => {
        setCountry(details)
        addHistory({
          id: `${Date.now()}-${details.cca2}`,
          searchedAt: new Date().toISOString(),
          country: details.name,
          cca2: details.cca2,
          capital: details.capital.join(', ') || 'Not listed',
          region: details.region,
        })
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          setCountry(null)
          setDetailError(error instanceof Error ? error.message : 'Failed to load country information.')
        }
      })
      .finally(() => { if (!controller.signal.aborted) setDetailLoading(false) })
    return () => controller.abort()
  }, [selectedCode, countries, addHistory])

  const isFavorite = country ? favorites.some((item) => item.cca2 === country.cca2) : false
  const latestSearch = history[0]
  const locale = language === 'he' ? 'he-IL' : language === 'ar' ? 'ar' : 'en'

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow hero-eyebrow">{t('heroEyebrow')}</span>
          <h1>{t('heroTitleOne')}<br /><em>{t('heroTitleTwo')}</em></h1>
          <p>{t('heroDescription')}</p>
          <div className="hero-meta"><span className="meta-icon">✳</span><span>{t('exploreAtPace')}</span><span className="meta-divider">·</span><span>{t('poweredBy')}</span></div>
        </div>
        <div className="hero-art" role="img" aria-label={t('globeLabel')}>
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="globe"><div className="globe-latitude latitude-one" /><div className="globe-latitude latitude-two" /><div className="globe-longitude" /><span className="globe-land land-one" /><span className="globe-land land-two" /><span className="globe-land land-three" /></div>
          <span className="spark spark-one">✦</span><span className="spark spark-two">✳</span><span className="globe-caption">{t('globeLabel')}</span>
        </div>
      </section>

      <section className="explorer-section" aria-labelledby="explorer-title">
        <div className="section-heading">
          <div><span className="eyebrow">{t('startExploring')}</span><h2 id="explorer-title">{t('chooseDestination')}</h2></div>
          <div className="live-badge"><span className="status-dot" /> {t('dataReady')}</div>
        </div>
        <div className="search-panel">
          <label className="select-field country-field"><span className="field-label">{t('country')}</span>
            <select aria-label={t('country')} value={selectedCode} onChange={(event) => setSelectedCode(event.target.value)} disabled={countriesLoading || Boolean(countriesError)}>
              <option value="">{countriesLoading ? t('loadingCountries') : t('chooseCountry')}</option>
              {visibleCountries.map((item) => <option key={item.cca2} value={item.cca2}>{localizedCountryName(item.cca2, item.name, language)}</option>)}
            </select>
          </label>
          <label className="select-field region-field"><span className="field-label">{t('filterRegion')}</span>
            <select aria-label={t('filterRegion')} value={region} onChange={(event) => setRegion(event.target.value as RegionFilter)}>
              {regions.map((item) => <option key={item} value={item}>{item === 'All regions' ? t('allRegions') : localizedRegion(item, language)}</option>)}
            </select>
          </label>
          <div className="result-count"><span className="count-number">{countriesLoading ? '—' : new Intl.NumberFormat(locale).format(visibleCountries.length)}</span><span>{t('countriesToDiscover')}</span></div>
        </div>
        {countriesError && <div className="alert alert-error" role="alert"><span>!</span><div><strong>{t('countryListError')}</strong><p>{t('genericError')}</p><button className="text-button" type="button" onClick={() => setListRetry((attempt) => attempt + 1)}>{t('tryAgain')}</button></div></div>}

        <div className="result-area" aria-live="polite">
          {detailLoading && <div className="loading-card"><span className="spinner" /><div><strong>{t('gatheringDetails')}</strong><p>{t('findingStory')}</p></div></div>}
          {detailError && <div className="alert alert-error" role="alert"><span>!</span><div><strong>{t('countryInfoError')}</strong><p>{t('genericError')}</p></div></div>}
          {country && !detailLoading && <CountryCard country={country} isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />}
          {!country && !detailLoading && !detailError && !countriesError && <div className="welcome-card"><div className="welcome-icon">⌖</div><div><span className="eyebrow">{t('nextDiscovery')}</span><h3>{t('worldWaiting')}</h3><p>{t('chooseCountryDetails')}</p></div><span className="welcome-decoration" aria-hidden="true">✳</span></div>}
        </div>
      </section>

      <section className="below-grid">
        <div className="note-card"><span className="eyebrow">{t('didYouKnow')}</span><p><strong>195+</strong> {t('countryCountText')}</p><span className="note-spark" aria-hidden="true">✳</span></div>
        <div className="recent-card"><div><span className="eyebrow">{t('yourJourney')}</span><h3>{t('recentDiscoveries')}</h3></div>{latestSearch ? <div className="recent-detail"><span className="recent-marker">↗</span><div><strong>{localizedCountryName(latestSearch.cca2 ?? '', latestSearch.country, language)}</strong><span>{latestSearch.capital} · {localizedRegion(latestSearch.region, language)}</span></div></div> : <p className="muted-copy">{t('firstDiscovery')}</p>}</div>
      </section>
      <footer className="page-footer"><span>{t('madeCurious')}</span><span>{t('dataCourtesy')}</span></footer>
    </main>
  )
}
