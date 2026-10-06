import type { CountryDetails, CountryOption } from '../types/Country'

interface CountryRecord {
  name: { common?: string; official?: string }
  cca2?: string
  cca3?: string
  capital?: string[]
  region?: string
  subregion?: string
  area?: number
}

interface PopulationEstimate {
  population: number
  year: number
  source: string
}

type PopulationLookup = Record<string, PopulationEstimate>

const COUNTRY_SOURCE = '/countries.json'
const POPULATION_SOURCE = '/populations.json'

let countriesCache: CountryRecord[] | undefined
let populationsCache: PopulationLookup | undefined

async function fetchJson<T>(source: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(source, { signal })
  if (!response.ok) {
    throw new Error(`Failed to load ${source} (${response.status}). Please try again.`)
  }
  return await response.json() as T
}

async function loadCountryData(signal?: AbortSignal): Promise<void> {
  if (countriesCache && populationsCache) return

  const [countries, populations] = await Promise.all([
    fetchJson<CountryRecord[]>(COUNTRY_SOURCE, signal),
    fetchJson<PopulationLookup>(POPULATION_SOURCE, signal),
  ])

  if (!Array.isArray(countries) || countries.length === 0) {
    throw new Error('The country dataset is empty or invalid.')
  }

  countriesCache = countries
  populationsCache = populations
}

export async function fetchCountryList(signal?: AbortSignal): Promise<CountryOption[]> {
  await loadCountryData(signal)
  const countries = countriesCache
  if (!countries) throw new Error('The country dataset could not be loaded.')

  const result = countries
    .flatMap((country) => {
      const name = country.name.common
      const cca2 = country.cca2
      return name && cca2 ? [{ name, cca2, region: country.region ?? 'Other' }] : []
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  if (result.length === 0) throw new Error('The country dataset did not contain any countries.')
  return result
}

export async function fetchCountryDetails(code: string, signal?: AbortSignal): Promise<CountryDetails> {
  await loadCountryData(signal)
  const countries = countriesCache
  const populations = populationsCache
  if (!countries || !populations) throw new Error('Country data could not be loaded.')

  const country = countries.find(
    (item) => item.cca2?.toLowerCase() === code.toLowerCase(),
  )
  if (!country?.name.common || !country.cca2) {
    throw new Error('Country information was not found.')
  }

  const population = country.cca3 ? populations[country.cca3] : undefined
  const flagUrl = `https://flagcdn.com/${country.cca2.toLowerCase()}.svg`

  return {
    name: country.name.common,
    officialName: country.name.official ?? country.name.common,
    cca2: country.cca2,
    capital: country.capital ?? [],
    region: country.region ?? 'Unknown',
    subregion: country.subregion ?? '',
    population: population?.population ?? 0,
    area: country.area ?? 0,
    flag: flagUrl,
    flagAlt: `Flag of ${country.name.common}`,
  }
}
