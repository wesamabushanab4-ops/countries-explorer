import { useCallback, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import WorldBackdrop from './components/WorldBackdrop'
import { useLocalStorage } from './hooks/useLocalStorage'
import About from './pages/About'
import Countries from './pages/Countries'
import Favorites from './pages/Favorites'
import History from './pages/History'
import { LanguageContext, type Language } from './i18n'
import type { CountryDetails, SearchRecord } from './types/Country'

function isLanguage(value: unknown): value is Language {
  return value === 'en' || value === 'he' || value === 'ar'
}

function isColorTheme(value: unknown): value is 'light' | 'dark' {
  return value === 'light' || value === 'dark'
}

function isSearchRecordArray(value: unknown): value is SearchRecord[] {
  return Array.isArray(value) && value.every((record: unknown) =>
    typeof record === 'object'
    && record !== null
    && 'id' in record && typeof record.id === 'string'
    && 'searchedAt' in record && typeof record.searchedAt === 'string' && Number.isFinite(Date.parse(record.searchedAt))
    && 'country' in record && typeof record.country === 'string'
    && 'capital' in record && typeof record.capital === 'string'
    && 'region' in record && typeof record.region === 'string',
  )
}

function isCountryDetailsArray(value: unknown): value is CountryDetails[] {
  return Array.isArray(value) && value.every((country: unknown) =>
    typeof country === 'object'
    && country !== null
    && 'name' in country && typeof country.name === 'string'
    && 'officialName' in country && typeof country.officialName === 'string'
    && 'cca2' in country && typeof country.cca2 === 'string'
    && 'capital' in country && Array.isArray(country.capital) && country.capital.every((capital: unknown) => typeof capital === 'string')
    && 'region' in country && typeof country.region === 'string'
    && 'subregion' in country && typeof country.subregion === 'string'
    && 'population' in country && typeof country.population === 'number' && Number.isFinite(country.population)
    && 'area' in country && typeof country.area === 'number' && Number.isFinite(country.area)
    && 'flag' in country && typeof country.flag === 'string'
    && 'flagAlt' in country && typeof country.flagAlt === 'string',
  )
}

function AppContent() {
  const [history, setHistory, historyStorageError] = useLocalStorage<SearchRecord[]>('countries-explorer-history', [], isSearchRecordArray)
  const [favorites, setFavorites, favoritesStorageError] = useLocalStorage<CountryDetails[]>('countries-explorer-favorites', [], isCountryDetailsArray)
  const [theme, setTheme, themeStorageError] = useLocalStorage<'light' | 'dark'>('countries-explorer-theme', 'light', isColorTheme)
  const [language, setLanguage, languageStorageError] = useLocalStorage<Language>('countries-explorer-language', 'en', isLanguage)
  const storageError = historyStorageError || favoritesStorageError || themeStorageError || languageStorageError

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'en' ? 'ltr' : 'rtl'
  }, [language])
  const addHistory = useCallback((record: SearchRecord) => {
    setHistory((current) => [record, ...current].slice(0, 100))
  }, [setHistory])

  const toggleFavorite = useCallback((country: CountryDetails) => {
    setFavorites((current) => current.some((item) => item.cca2 === country.cca2)
      ? current.filter((item) => item.cca2 !== country.cca2)
      : [country, ...current])
  }, [setFavorites])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
    <>
      <WorldBackdrop />
      <div className="app-frame">
        <Navbar
          theme={theme}
          onToggleTheme={() => setTheme((current) => current === 'light' ? 'dark' : 'light')}
        />
        {storageError && <div className="alert alert-error storage-alert" role="alert"><span>!</span><div><strong>{language === 'he' ? 'לא ניתן לשמור נתונים בדפדפן באופן אמין.' : language === 'ar' ? 'تعذر حفظ البيانات في المتصفح بشكل موثوق.' : 'Browser data could not be saved reliably.'}</strong><p>{storageError}</p></div></div>}
        <Routes>
          <Route path="/" element={<Countries history={history} addHistory={addHistory} favorites={favorites} toggleFavorite={toggleFavorite} />} />
          <Route path="/history" element={<History history={history} clearHistory={() => setHistory([])} />} />
          <Route path="/favorites" element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Countries history={history} addHistory={addHistory} favorites={favorites} toggleFavorite={toggleFavorite} />} />
        </Routes>
      </div>
    </>
    </LanguageContext.Provider>
  )
}

export default function App() {
  return <BrowserRouter><AppContent /></BrowserRouter>
}
