export const MAX_GUITARS_COUNT = 9;
export const MAX_GUITAR_RATING = 5;

export const ratingStarSize = {
  width: 12,
  heigth: 11,
};

export const ratingStarSizeBigger = {
  width: 14,
  heigth: 14,
};

export enum NameSpace {
  guitars = 'GUITARS',
}

export enum APIRoute {
  Guitars = '/guitars',
}

export enum AppRoute {
  Root = '/',
  CatalogPage = 'catalog/page_:pageNumber',
  CatalogPageNumber = '/catalog/page_',
  DefaultCatalogPage = '/catalog/page_1',
  GuitarPage = '/guitar/',
  GuitarPageId = '/guitar/:id'
}

export const guitarTypes = {
  acoustic: 'Акустическая',
  electric: 'Электрогитара',
  ukulele: 'Укулеле',
};
