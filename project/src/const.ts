export const MAX_GUITARS_COUNT = 9;
export const MAX_GUITAR_RATING = 5;
export const REVIEWS_STEP = 3;

export const ratingStarSize = {
  width: 12,
  heigth: 11,
};

export const ratingStarSizeBigger = {
  width: 14,
  heigth: 14,
};

export const ratingStarSizeBig = {
  width: 16,
  heigth: 16,
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

export const Rating = new Map([ [1, 'Очень плохо'], [2, 'Плохо'], [3, 'Приемлемо'], [4, 'Хорошо'], [5, 'Отлично'] ]);

export enum tabsTypes {
  Characteristics = 'characteristics',
  Description = 'description',
}
