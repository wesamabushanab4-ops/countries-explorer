import { useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import WorldBackdrop from './components/WorldBackdrop'
import About from './pages/About'
import Countries from './pages/Countries'
import Favorites from './pages/Favorites'
import History from './pages/History'
import type { CountryDetails, SearchHistoryItem } from './types/Country'

const HISTORY_KEY = 'countries-explorer-history'
const FAVORITES_KEY = 'countries-explorer-favorites'

const readStoredData = <T,>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : fallback
  } catch {
    return fallback
  }
}

function App() {
  const [history, setHistory] = useState<SearchHistoryItem[]>(() =>
    readStoredData<SearchHistoryItem[]>(HISTORY_KEY, []),
  )
  const [favorites, setFavorites] = useState<CountryDetails[]>(() =>
    readStoredData<CountryDetails[]>(FAVORITES_KEY, []),
  )

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  }, [history])

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  }, [favorites])

  const handleSearch = useCallback((country: CountryDetails) => {
    const newEntry: SearchHistoryItem = {
      id: `${country.name}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      searchTime: new Date().toLocaleString('en-GB'),
      country: country.name,
      capital: country.capital,
      region: country.region,
    }

    setHistory((current) => [newEntry, ...current])
  }, [])

  const handleAddFavorite = useCallback((country: CountryDetails) => {
    setFavorites((current) => {
      if (current.some((item) => item.name === country.name)) {
        return current
      }

      return [country, ...current]
    })
  }, [])

  const handleRemoveFavorite = useCallback((countryName: string) => {
    setFavorites((current) => current.filter((country) => country.name !== countryName))
  }, [])

  return (
    <BrowserRouter>
      <>
        <WorldBackdrop />
        <div className="app-shell">
          <Navbar />

          <main className="page-content">
            <Routes>
              <Route
                path="/"
                element={
                  <Countries
                    onSearch={handleSearch}
                    onAddFavorite={handleAddFavorite}
                    favorites={favorites}
                  />
                }
              />
              <Route path="/history" element={<History history={history} />} />
              <Route path="/favorites" element={<Favorites favorites={favorites} onRemoveFavorite={handleRemoveFavorite} />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
        </div>
      </>
    </BrowserRouter>
  )
}

export default App
