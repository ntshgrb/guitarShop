import { createSelector } from 'reselect';
import { Guitar } from '../../types/guitar';
import { UserComment } from '../../types/comment';
import { State } from '../../types/state';
import { MAX_GUITARS_COUNT, NameSpace } from '../../const';

const selectGuitarsList = (state: State) => state[NameSpace.guitars].guitarsList;
const selectUserComments = (state: State) => state[NameSpace.currentGuitar].comments;

export const getGuitarsByPage = (page: number) => createSelector(
  [
    selectGuitarsList,
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

