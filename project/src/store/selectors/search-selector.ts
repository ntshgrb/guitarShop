import { createSelector } from 'reselect';
import { NameSpace } from '../../const';
import { Guitar } from '../../types/guitar';
import { State } from '../../types/state';

export const selectSearchData = (searchRequest: string | null) => createSelector(
  [
    (state: State) => state[NameSpace.guitars].guitarsList,
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
