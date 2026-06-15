import React from 'react'

export type ChildrenType = {
  children: React.ReactNode;
};

export type CountryCapital = {
  name: string,
  coordinates: {
    lat: number,
    lng: number
  },
  attributes: {
    primary?: boolean,
    constitutional?: boolean,
    administrative?: boolean,
    executive?: boolean,
    legislative?: boolean,
    judicial?: boolean
  }
}

export type CountryCurrency = {
  code: string,
  name: string,
  symbol: string
}

export type CountryLanguage = {
  iso639_1?: string,
  iso639_2b?: string,
  iso639_2t?: string,
  iso639_3?: string,
  bcp47?: string,
  name: string,
  native_name?: string
}

export type CountryListItem = {
  names: {
    common: string
  },
  flag: {
    url_svg: string,
    description: string
  },
  population: number,
  region: string,
  capitals: CountryCapital[]
}

export type CountriesMeta = {
  total: number,
  count: number,
  limit: number,
  offset: number,
  more: boolean
}

export type CountriesPage = {
  objects: CountryListItem[],
  meta: CountriesMeta
}

export type CountryDetail = {
  names: {
    common: string,
    native: Record<string, { common: string, official: string }>
  },
  flag: {
    url_svg: string,
    description: string
  },
  population: number,
  region: string,
  subregion: string,
  capitals: CountryCapital[],
  tlds: string[],
  currencies: CountryCurrency[],
  languages: CountryLanguage[],
  borders: string[]
}
