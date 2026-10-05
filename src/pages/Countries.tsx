import { useEffect, useMemo, useState, type ChangeEvent } from 'react'
import CountryCard from '../components/CountryCard'
import type { CountryDetails, CountryListItem } from '../types/Country'

type CountriesProps = {
  onSearch: (country: CountryDetails) => void
  onAddFavorite: (country: CountryDetails) => void
  favorites: CountryDetails[]
}

type CountryApiRecord = {
  name: {
    common: string
  }
  cca2?: string
  cca3?: string
  capital?: string[]
  region?: string
  population?: number
  area?: number
}

type PopulationEstimate = {
  population: number
  year: number
  source: string
}

type PopulationLookup = Record<string, PopulationEstimate>

const regionOptions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
const countrySource = '/countries.json'
const populationSource = '/populations.json'

const mapCountryResponse = (
  apiCountry: CountryApiRecord,
  population: PopulationEstimate | undefined,
): CountryDetails => {
  const countryCode = (apiCountry.cca2 ?? apiCountry.cca3 ?? '').toLowerCase()

  return {
    name: apiCountry.name.common,
    capital: apiCountry.capital?.[0] ?? 'N/A',
    region: apiCountry.region ?? 'N/A',
    population: population?.population ?? null,
    populationYear: population?.year ?? null,
    populationSource: population?.source ?? null,
    area: apiCountry.area ?? 0,
    flags: {
      png: countryCode ? `https://flagcdn.com/w320/${countryCode}.png` : '',
      alt: `${apiCountry.name.common} flag`,
    },
  }
}

const fetchJson = async <T,>(source: string): Promise<T> => {
  const response = await fetch(source)

  if (!response.ok) {
    throw new Error(`Failed to load ${source}`)
  }

  return (await response.json()) as T
}

const fetchCountryByName = async (countryName: string): Promise<CountryApiRecord> => {
  const countryData = await fetchJson<CountryApiRecord[]>(countrySource)
  const match = countryData.find(
    (country) =>
      country.name.common.toLowerCase() === countryName.toLowerCase() ||
      country.cca2?.toLowerCase() === countryName.toLowerCase(),
  )

  if (!match) {
    throw new Error('Country not found')
  }

  return match
}

export default function Countries({ onSearch, onAddFavorite, favorites }: CountriesProps) {
  const [countries, setCountries] = useState<CountryListItem[]>([])
  const [populationEstimates, setPopulationEstimates] = useState<PopulationLookup>({})
  const [regionFilter, setRegionFilter] = useState('All')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [countryInfo, setCountryInfo] = useState<CountryDetails | null>(null)
  const [loadingCountries, setLoadingCountries] = useState(true)
  const [loadingCountry, setLoadingCountry] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    const loadCountries = async () => {
      try {
        setLoadingCountries(true)
        setError('')

        const [countryList, populationData] = await Promise.all([
          fetchJson<CountryApiRecord[]>(countrySource),
          fetchJson<PopulationLookup>(populationSource),
        ])
        const formattedCountries = countryList
          .map((country) => ({
            name: country.name.common,
            cca2: country.cca2 ?? '',
            region: country.region ?? 'Unknown',
          }))
          .sort((a, b) => a.name.localeCompare(b.name))

        if (!ignore) {
          setCountries(formattedCountries)
          setPopulationEstimates(populationData)
          setSelectedCountry((current) =>
            current && formattedCountries.some((item) => item.name === current)
              ? current
              : formattedCountries[0]?.name ?? '',
          )
        }
      } catch {
        if (!ignore) {
          setError('Failed to load available countries.')
        }
      } finally {
        if (!ignore) {
          setLoadingCountries(false)
        }
      }
    }

    void loadCountries()

    return () => {
      ignore = true
    }
  }, [])

  const filteredCountries = useMemo(() => {
    if (regionFilter === 'All') {
      return countries
    }

    return countries.filter((country) => country.region === regionFilter)
  }, [countries, regionFilter])

  useEffect(() => {
    if (!filteredCountries.length) {
      setSelectedCountry('')
      setCountryInfo(null)
      return
    }

    if (!filteredCountries.some((country) => country.name === selectedCountry)) {
      setSelectedCountry(filteredCountries[0].name)
    }
  }, [filteredCountries, selectedCountry])

  useEffect(() => {
    if (!selectedCountry) {
      return
    }

    let ignore = false

    const loadCountry = async () => {
      try {
        setLoadingCountry(true)
        setError('')

        const countryData = await fetchCountryByName(selectedCountry)
        const country = mapCountryResponse(
          countryData,
          populationEstimates[countryData.cca3 ?? ''],
        )

        if (!ignore) {
          setCountryInfo(country)
          onSearch(country)
        }
      } catch {
        if (!ignore) {
          setError('Failed to load country information')
        }
      } finally {
        if (!ignore) {
          setLoadingCountry(false)
        }
      }
    }

    void loadCountry()

    return () => {
      ignore = true
    }
  }, [onSearch, populationEstimates, selectedCountry])

  const handleRegionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRegionFilter(event.target.value)
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <p className="section-kicker">A world of discovery</p>
          <h1>Explore countries</h1>
          <p className="page-description">
            Find a place, learn the details, and save the ones you love.
          </p>
        </div>
        <div className="globe-scene" aria-hidden="true">
          <div className="globe-orbit globe-orbit-one" />
          <div className="globe-orbit globe-orbit-two" />
          <svg className="globe" viewBox="0 0 180 180" fill="none">
            <defs>
              <radialGradient id="oceanGradient" cx="35%" cy="28%" r="78%">
                <stop offset="0" stopColor="#8fc4ff" />
                <stop offset=".52" stopColor="#3177df" />
                <stop offset="1" stopColor="#153d92" />
              </radialGradient>
              <linearGradient id="landGradient" x1="40" y1="48" x2="132" y2="134">
                <stop offset="0" stopColor="#fff1d6" />
                <stop offset="1" stopColor="#e6b873" />
              </linearGradient>
              <clipPath id="globeClip">
                <circle cx="90" cy="90" r="68" />
              </clipPath>
            </defs>
            <circle cx="90" cy="90" r="68" fill="url(#oceanGradient)" />
            <g className="globe-lines" clipPath="url(#globeClip)">
              <ellipse cx="90" cy="90" rx="31" ry="68" />
              <ellipse cx="90" cy="90" rx="58" ry="68" />
              <path d="M18 90h144M28 64c36 17 88 17 124 0M28 116c36-17 88-17 124 0" />
              <path className="globe-land" d="m48 54 13-9 11 3 5 9-8 5-3 12-8 4-5 12-8-3-4-15 5-7-6-6 8-5Zm25 38 10 2 8 8-4 12-8 5-3 15-8-4-5-14 5-9-4-8 9-7Zm29-44 9-8 17 2 8 9 15 1 7 7-7 9-13-3-10 8-10-2-4 10-9 3-5-8 5-11-7-6 4-11Zm30 56 10-4 12 7-3 10-12 6-7-7-8 2-4-8 12-6Z" />
            </g>
            <circle cx="90" cy="90" r="68" stroke="rgba(255,255,255,.68)" strokeWidth="1.5" />
            <path d="M39 48c19-20 49-30 79-24" stroke="rgba(255,255,255,.58)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="globe-label">EXPLORE THE WORLD</span>
        </div>
      </div>

      <div className="controls-panel">
        <div className="controls-heading">
          <span className="controls-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 7h16M7 12h10m-7 5h4" />
              <circle cx="8" cy="7" r="1.5" />
              <circle cx="15" cy="12" r="1.5" />
              <circle cx="11" cy="17" r="1.5" />
            </svg>
          </span>
          <div>
            <strong>Start exploring</strong>
            <span>Choose a region and a country</span>
          </div>
        </div>
        <label className="select-group">
          <span>Filter by region</span>
          <select value={regionFilter} onChange={handleRegionChange}>
            {regionOptions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </label>

        <label className="select-group">
          <span>Select a country</span>
          <select
            value={selectedCountry}
            onChange={(event) => setSelectedCountry(event.target.value)}
            disabled={loadingCountries || filteredCountries.length === 0}
          >
            {filteredCountries.map((country) => (
              <option key={`${country.name}-${country.cca2}`} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {loadingCountries ? <div className="loading-state">Loading...</div> : null}
      {error ? <div className="error-state">{error}</div> : null}

      {!loadingCountries && !error && loadingCountry ? (
        <div className="loading-state">Loading...</div>
      ) : null}

      {!loadingCountries && !loadingCountry && !error && countryInfo ? (
        <CountryCard
          country={countryInfo}
          isFavorite={favorites.some((country) => country.name === countryInfo.name)}
          onAddFavorite={onAddFavorite}
        />
      ) : null}
    </section>
  )
}
