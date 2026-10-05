import type { CountryDetails } from '../types/Country'

type CountryCardProps = {
  country: CountryDetails | null
  isFavorite?: boolean
  onAddFavorite?: (country: CountryDetails) => void
  onRemoveFavorite?: (countryName: string) => void
}

const formatNumber = (value: number | null) =>
  value === null ? 'Not available' : new Intl.NumberFormat('en-US').format(value)

export default function CountryCard({
  country,
  isFavorite = false,
  onAddFavorite,
  onRemoveFavorite,
}: CountryCardProps) {
  if (!country) {
    return <div className="empty-state">No country selected.</div>
  }

  const handleFavoriteClick = () => {
    if (isFavorite) {
      onRemoveFavorite?.(country.name)
      return
    }

    onAddFavorite?.(country)
  }

  return (
    <article className="country-card">
      <div className="country-header">
        <div>
          <p className="eyebrow">Country overview</p>
          <h2>{country.name}</h2>
          <span className="region-chip">{country.region}</span>
        </div>
        <button
          type="button"
          className="favorite-button"
          onClick={handleFavoriteClick}
        >
          {isFavorite ? 'Remove' : 'Add to Favorites'}
        </button>
      </div>

      <div className="country-info">
        <div className="flag-box">
          <img src={country.flags.png} alt={country.flags.alt} loading="lazy" />
        </div>

        <div className="country-details">
          <div className="country-detail">
            <span>Capital</span>
            <strong>{country.capital}</strong>
          </div>
          <div className="country-detail">
            <span>Region</span>
            <strong>{country.region}</strong>
          </div>
          <div className="country-detail">
            <span>Population</span>
            <strong>
              {formatNumber(
                country.population === 0 && !country.populationYear
                  ? null
                  : country.population,
              )}
            </strong>
            {country.populationYear && country.populationSource ? (
              <small className="population-year">
                {country.populationSource} · {country.populationYear}
              </small>
            ) : country.population === null ||
              (country.population === 0 && !country.populationYear) ? (
              <small className="population-year">Estimate unavailable</small>
            ) : null}
          </div>
          <div className="country-detail">
            <span>Land area</span>
            <strong>{formatNumber(country.area)} km²</strong>
          </div>
        </div>
      </div>
    </article>
  )
}
