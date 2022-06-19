import { Sorting } from '../const';
import { SortingOrderType } from '../types/catalog-settings-types';
import { Guitar } from '../types/guitar';

export const sortByPrice = (guitars: Guitar[], sortingOrder: SortingOrderType) => {
  switch (sortingOrder) {
    case Sorting.asc:
      return [...guitars].sort( (firstGuitar, secondGuitar) => firstGuitar.price - secondGuitar.price);
    case Sorting.desc:
      return [...guitars].sort((firstGuitar, secondGuitar) => secondGuitar.price - firstGuitar.price);
    default:
      return [...guitars].sort((firstGuitar, secondGuitar) => firstGuitar.price - secondGuitar.price);
  }
};

export const sortByPopularity = (guitars: Guitar[], sortingOrder: SortingOrderType) => {
  switch (sortingOrder) {
    case Sorting.asc:
      return [...guitars].sort( (firstGuitar, secondGuitar) => firstGuitar.rating - secondGuitar.rating);
    case Sorting.desc:
      return [...guitars].sort((firstGuitar, secondGuitar) => secondGuitar.rating - firstGuitar.rating);
    default:
      return [...guitars].sort( (firstGuitar, secondGuitar) => firstGuitar.rating - secondGuitar.rating);

  }
};
