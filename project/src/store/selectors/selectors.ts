import { createSelector } from 'reselect';
import { Guitar } from '../../types/guitar';
import { UserComment } from '../../types/comment';
import { State } from '../../types/state';
import { MAX_GUITARS_COUNT, NameSpace, Sorting } from '../../const';
import { SortingSettingsType } from '../../types/catalog-settings-types';
import { sortByPopularity, sortByPrice } from '../../utils/catalog-sorting';

const selectGuitarsList = (state: State) => state[NameSpace.guitars].guitarsList;
const selectUserComments = (state: State) => state[NameSpace.currentGuitar].comments;

export const getGuitarsByPage = (page: number, props: SortingSettingsType) => createSelector(
  [
    selectGuitarsList,
    () => page,
  ],
  (guitars: Guitar[]) => {
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

    return guitarsList.slice(firstGuitarIndex, lastGuitarIndex);
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

