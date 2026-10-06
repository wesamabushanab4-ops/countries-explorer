import CountryCard from '../components/CountryCard'
import EmptyState from '../components/EmptyState'
import { useTranslation } from '../i18n'
import type { CountryDetails } from '../types/Country'

interface FavoritesProps { favorites: CountryDetails[]; toggleFavorite: (country: CountryDetails) => void }

export default function Favorites({ favorites, toggleFavorite }: FavoritesProps) {
  const { t } = useTranslation()
  return (
    <main className="page-shell inner-page">
      <section className="page-intro"><span className="eyebrow">{t('placesToKeep')}</span><h1>{t('lovedWorldOne')}<br /><em>{t('lovedWorldTwo')}</em></h1><p>{t('favoritesDescription')}</p></section>
      <section className="content-panel"><div className="panel-heading"><div><span className="eyebrow">{t('savedPlaces')}</span><h2>{t('favorites')} <span className="count-pill">{favorites.length}</span></h2></div></div>
        {favorites.length === 0 ? <EmptyState icon="♡" title={t('nothingSaved')} description={t('addFavoritesHint')} /> : <div className="favorites-grid">{favorites.map((country) => <CountryCard key={country.cca2} country={country} isFavorite onToggleFavorite={toggleFavorite} compact />)}</div>}
      </section>
      <footer className="page-footer"><span>{t('madeCurious')}</span><span>{t('favoritesStay')}</span></footer>
    </main>
  )
}
