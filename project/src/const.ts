export enum NameSpaces {
  guitars = 'GUITARS',
}

export enum APIRoute {
  Guitars = '/guitars',
}

export const MAX_GUITARS_COUNT = 9;

export enum AppRoute {
  Root = '/',
  CatalogPage = 'catalog/page_:pageNumber',
  CatalogPageNumber = '/catalog/page_',
  DefaultCatalogPage = '/catalog/page_1',
  GuitarPage = '/guitar/',
  GuitarPageId = '/guitar/:id'
}
