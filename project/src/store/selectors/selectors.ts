import { createSelector } from 'reselect';
import { Guitar } from '../../types/guitar';
import { UserComment } from '../../types/comment';
import { State } from '../../types/state';
import { MAX_GUITARS_COUNT, NameSpace } from '../../const';

export const getGuitarsByPage = (page: number) => createSelector(
  [
    (state: State) => state[NameSpace.guitars].guitarsList,
    () => page,
  ],
  (guitars: Guitar[]) => {
    const lastGuitarIndex = page * MAX_GUITARS_COUNT;
    const firstGuitarIndex = lastGuitarIndex - MAX_GUITARS_COUNT;

    return guitars.slice(firstGuitarIndex, lastGuitarIndex);
  },
);

export const getComments = (commentsCount: number, removeButton: () => void) => createSelector(
  [
    (state: State) => state[NameSpace.currentGuitar].comments,
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

