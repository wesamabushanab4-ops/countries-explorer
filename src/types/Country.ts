export type CountryListItem = {
  name: string
  cca2: string
  region: string
}

export type CountryDetails = {
  name: string
  capital: string
  region: string
  population: number | null
  populationYear: number | null
  populationSource: string | null
  area: number
  flags: {
    png: string
    alt: string
  }
}

export type SearchHistoryItem = {
  id: string
  searchTime: string
  country: string
  capital: string
  region: string
}
