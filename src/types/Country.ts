export interface CountryOption {
  name: string
  cca2: string
  region: string
}

export interface CountryDetails {
  name: string
  officialName: string
  cca2: string
  capital: string[]
  region: string
  subregion: string
  population: number
  area: number
  flag: string
  flagAlt: string
}

export interface SearchRecord {
  id: string
  searchedAt: string
  country: string
  cca2?: string
  capital: string
  region: string
}

export type RegionFilter = 'All regions' | 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania' | 'Antarctic'
