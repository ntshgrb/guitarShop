import { createSelector } from 'reselect';
import { NameSpace } from '../../const';
import { Guitar } from '../../types/guitar';
import { State } from '../../types/state';

const selectGuitars = (state: State) => state[NameSpace.guitars].guitarsList;

export const selectSearchData = (searchRequest: string | null) => createSelector(
  [
    selectGuitars,
  ],
  (guitars: Guitar[]) => {
    if (!searchRequest) {
      return [];
    }

    return guitars.filter( (item: Guitar) => {
      const itemName = item.name.toLowerCase();
      return itemName.startsWith(searchRequest.toLowerCase());
    });
  },
);
