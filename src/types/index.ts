import React from 'react'

export type ChildrenType = {
  children: React.ReactNode;
};

export type CountryType = {
  altSpellings: string[],
  area: number,
  borders: string[],
  capital: string[],
  capitalInfo: {
    latlng: number[]
  },
  car: {
    signs: string[],
    side: string
  },
  cca2: string,
  cca3: string,
  ccn3: string,
  cioc: string,
  coatOfArms: {
    png: string,
    svg: string
  },
  continents: string[],
  currencies: Record<string, unknown>,
  demonyms: Record<string, unknown>,
  fifa: string,
  flag: string,
  flags: {
    png: string,
    svg: string,
    alt: string
  },
  gini: Record<number, number>,
  idd: {
    root: string,
    suffixes: string[]
  },
  independent: boolean,
  landlocked: boolean,
  languages: Record<string, string>,
  latlng: number[],
  maps: {
    googleMaps: string,
    openStreetMaps: string
  },
  name: {
    common: string,
    official: string,
    nativeName: Record<string, unknown>
  },
  population: number,
  postalCode: {
    format: string,
    regex: string
  },
  region: string,
  startOfWeek: string,
  status: string,
  subregion: string,
  timezones: string[],
  tld: string[],
  translations: Record<string, unknown>,
  unMember: boolean
}
