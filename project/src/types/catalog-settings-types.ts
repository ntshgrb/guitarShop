import { Sorting } from '../const';

export type SortingType = null | Sorting.popularity | Sorting.price;

export type SortingOrderType = null | Sorting.asc | Sorting.desc;

export type SortingSettingsType = {
  sortingType: SortingType,
  sortingOrder: SortingOrderType,
}
