import type { CountryDetails } from '../types/Country'
import { localizedCountryName, localizedRegion, useTranslation } from '../i18n'

interface CountryCardProps {
  country: CountryDetails
  isFavorite?: boolean
  onToggleFavorite?: (country: CountryDetails) => void
  compact?: boolean
}

export default function CountryCard({ country, isFavorite = false, onToggleFavorite, compact = false }: CountryCardProps) {
  const { language, t } = useTranslation()
  const locale = language === 'he' ? 'he-IL' : language === 'ar' ? 'ar' : 'en'
  const numberFormat = new Intl.NumberFormat(locale)
  const displayName = localizedCountryName(country.cca2, country.name, language)

  return (
    <article className={`country-card${compact ? ' country-card-compact' : ''}`}>
      <div className="country-card-topline">
        <span className="eyebrow">{t('countryProfile')}</span>
        {onToggleFavorite && (
          <button
            className={`favorite-button${isFavorite ? ' is-favorite' : ''}`}
            type="button"
            onClick={() => onToggleFavorite(country)}
            aria-label={isFavorite ? `${t('removeFavorite')}: ${displayName}` : `${t('addFavorite')}: ${displayName}`}
            title={isFavorite ? t('removeFavorite') : t('addFavorite')}
          >
            {isFavorite ? '♥' : '♡'}
          </button>
        )}
      </div>
      <div className="country-identity">
        <div>
          <h2>{displayName}</h2>
          <p className="official-name">{country.officialName}</p>
        </div>
        <span className="country-code">{country.cca2}</span>
      </div>
      {country.flag && <div className="flag-wrap"><img className="country-flag" src={country.flag} alt={`${t('flagOf')} ${displayName}`} /></div>}
      <div className="facts-grid">
        <div className="fact"><span className="fact-label">{t('capital')}</span><strong>{country.capital.join(', ') || t('notListed')}</strong></div>
        <div className="fact"><span className="fact-label">{t('region')}</span><strong>{localizedRegion(country.region, language)}</strong></div>
        <div className="fact"><span className="fact-label">{t('population')}</span><strong>{numberFormat.format(country.population)}</strong></div>
        <div className="fact"><span className="fact-label">{t('area')}</span><strong>{numberFormat.format(country.area)} {language === 'ar' ? 'كم²' : language === 'he' ? 'קמ״ר' : 'km²'}</strong></div>
      </div>
      {!compact && language === 'en' && country.subregion && <p className="subregion-note">{t('partOf')} {country.subregion}</p>}
    </article>
  )
}
