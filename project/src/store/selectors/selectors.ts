import { createSelector } from 'reselect';
import { Guitar } from '../../types/guitar';
import { UserComment } from '../../types/comment';
import { State } from '../../types/state';
import { MAX_GUITARS_COUNT, NameSpace, Sorting } from '../../const';
import { guitarsTypes, SortingSettingsType } from '../../types/catalog-settings-types';
import { sortByPopularity, sortByPrice } from '../../utils/catalog-sorting';

const selectGuitarsList = (state: State) => state[NameSpace.guitars].guitarsList;
const selectUserComments = (state: State) => state[NameSpace.currentGuitar].comments;
const selectActiveTypes = (state: State) => state[NameSpace.catalogFilter].guitarType;
const selectActiveStrings = (state: State) => state[NameSpace.catalogFilter].stringsCount;
const selectPriceRange = (state: State) => state[NameSpace.catalogFilter].userPriceRange;

export const getGuitarsByPage = (page: number, props: SortingSettingsType) => createSelector(
  [
    selectGuitarsList,
    selectActiveTypes,
    selectActiveStrings,
    selectPriceRange,
  ],
  (guitars: Guitar[], activeTypes, activeStrings, priceRange) => {
    const lastGuitarIndex = page * MAX_GUITARS_COUNT;
    const firstGuitarIndex = lastGuitarIndex - MAX_GUITARS_COUNT;
    let guitarsList = guitars;

    switch (props.sortingType) {
      case Sorting.price:
        guitarsList = sortByPrice(guitarsList, props.sortingOrder);
        break;
      case Sorting.popularity:
        guitarsList = sortByPopularity(guitarsList, props.sortingOrder);
        break;
      default:
        guitarsList = guitars;
        break;
    }

    if (activeTypes && activeTypes.length !== 0) {
      guitarsList = guitarsList.filter((item) =>  activeTypes.includes(item.type as guitarsTypes));
    }

    if (activeStrings && activeStrings.length !== 0) {
      guitarsList = guitarsList.filter((item) => activeStrings.includes(item.stringCount));
    }

    if (priceRange && priceRange.userMaxPrice !== null && priceRange.userMinPrice !== null) {
      guitarsList = guitarsList.filter(
        (item) => priceRange.userMaxPrice !== null && priceRange.userMinPrice !== null &&
        (item.price >= priceRange.userMinPrice) && (item.price <= priceRange.userMaxPrice));
    }

    return {
      currentGuitarsList: guitarsList.slice(firstGuitarIndex, lastGuitarIndex),
      guitarsCount: guitarsList.length,
    };
  },
);

export const getComments = (commentsCount: number, removeButton: () => void) => createSelector(
  [
    selectUserComments,
  ],
  (comments: UserComment[] | null) => {
    if (comments){
      const sortedComments = comments.slice()
        .sort( (a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());

      if(sortedComments.length <= commentsCount) {
        removeButton();
      }

      const visibleComments = sortedComments.slice(0, commentsCount);

      return visibleComments;
    }
  },
);

