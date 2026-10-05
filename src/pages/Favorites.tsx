import CountryCard from '../components/CountryCard'
import PageHeader from '../components/PageHeader'
import type { CountryDetails } from '../types/Country'

type FavoritesProps = {
  favorites: CountryDetails[]
  onRemoveFavorite: (countryName: string) => void
}

export default function Favorites({ favorites, onRemoveFavorite }: FavoritesProps) {
  return (
    <section className="page-section">
      <PageHeader
        kicker="Your personal atlas"
        title="Favorite countries"
        description="A collection of places you want to remember."
        variant="favorites"
      />

      {favorites.length === 0 ? (
        <div className="empty-state">
          <strong>Your collection is waiting</strong>
          <span>Add a country to favorites and it will be saved here.</span>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((country) => (
            <CountryCard
              key={country.name}
              country={country}
              isFavorite
              onRemoveFavorite={onRemoveFavorite}
            />
          ))}
        </div>
      )}
    </section>
  )
}
