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
  currentGuitar = 'CURRENT_GUITAR',
  utils = 'UTILS',
  catalogFilter = 'CATALOG_FILTER',
  cart = 'CART',
}

export enum APIRoute {
  GuitarsLimited = '/guitars?_limit=27',
  Guitars = '/guitars',
  Comments = '/comments',
}

export enum AppRoute {
  Root = '/',
  CatalogPageNumber = '/catalog/page_',
  CatalogMain = '/catalog',
  Catalog = '/catalog/:pageNumber',
  ProductPage = '/guitar/',
  ProductPageId = '/guitar/:id',
  NotFound = 'notfound',
  Cart = 'cart',
}

export const guitarTypes = {
  acoustic: 'Акустическая',
  electric: 'Электрогитара',
  ukulele: 'Укулеле',
};

export const Rating = new Map([
  [1, 'Ужасно'],
  [2, 'Плохо'],
  [3, 'Нормально'],
  [4, 'Хорошо'],
  [5, 'Отлично'],
]);

export enum tabsTypes {
  Characteristics = 'characteristics',
  Description = 'description',
}

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
}

export enum Sorting {
  'desc' = 'DESC',
  'asc' = 'ASC',
  'price' = 'PRICE',
  'popularity' = 'POPULARITY',
}

export enum SortSearch {
  'sort' = '_sort',
  'order' = '_order',
}

export const availableTypes = [
  {
    name: 'Акустические гитары',
    typeName: 'acoustic',
    strings: [6, 7, 12],
  },
  {
    name: 'Электрогитары',
    typeName: 'electric',
    strings: [4, 6, 7],
  },
  {
    name: 'Укулеле',
    typeName: 'ukulele',
    strings: [4],
  },
];

export const availableStringsCount = {
  acoustic: [6, 7, 12],
  electric: [4, 6, 7],
  ukulele: [4],
};

export enum FilterParams {
  PriceStart = 'price_gte',
  PriceEnd = 'price_lte',
  Type = 'type',
  Strings = 'strings',
}

export enum RangeOfPrice {
  Start = 'от',
  End = 'до',
}

export enum BreadcrumbsNameSpace {
  Guitar = '/guitar/',
  Cart = '/cart',
  CartTitle = 'Корзина',
}
