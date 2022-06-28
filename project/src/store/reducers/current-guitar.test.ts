import { makeFakeGuitar, makeFakeComment } from '../../utils/mocks';
import { currentGuitar, loadGuitarData, loadGuitarComments, updateComments } from './current-guitar';

const DEFAULT_STATE = {
  guitar: null,
  comments: [],
  commentsCount: null,
};

const fakeGuitarData = makeFakeGuitar();
const fakeCommentsCount = 6;
const fakeComments = new Array(fakeCommentsCount).fill(null).map(() => makeFakeComment());
const fakeComment = makeFakeComment();

describe('Reducer: currentGuitar', () => {
  it('without additional parameters should return initial state', () => {
    expect(currentGuitar.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(DEFAULT_STATE);
  });

  it('should load current guitar data', () => {
    expect(currentGuitar.reducer(DEFAULT_STATE, loadGuitarData(fakeGuitarData)))
      .toEqual({
        guitar: fakeGuitarData,
        comments: [],
        commentsCount: null,
      });
  });

  it('should load current guitar comments and its count', () => {
    expect(currentGuitar.reducer(DEFAULT_STATE, loadGuitarComments(fakeComments)))
      .toEqual({
        guitar: null,
        comments:fakeComments,
        commentsCount: fakeCommentsCount,
      });
  });

  it('should update comments list', () => {
    const state = {
      guitar: fakeGuitarData,
      comments: fakeComments,
      commentsCount: fakeCommentsCount,
    };
    expect(currentGuitar.reducer(state, updateComments(fakeComment)))
      .toEqual({
        guitar: fakeGuitarData,
        comments: [...fakeComments, fakeComment],
        commentsCount: fakeCommentsCount + 1,
      });
  });
});

