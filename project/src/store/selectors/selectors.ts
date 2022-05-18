import { createSelector } from 'reselect';
import { Guitar } from '../../types/guitar';
import { State } from '../../types/state';
import { MAX_GUITARS_COUNT } from '../../const';

export const getGuitarsByPage = (page: number) => createSelector(
  [
    (state: State) => state.GUITARS.guitarsList,
    () => page,
  ],
  (guitars: Guitar[]) => {
    const lastGuitarIndex = page * MAX_GUITARS_COUNT;
    const firstGuitarIndex = lastGuitarIndex - MAX_GUITARS_COUNT;

    return guitars.slice(firstGuitarIndex, lastGuitarIndex);
  },
);
