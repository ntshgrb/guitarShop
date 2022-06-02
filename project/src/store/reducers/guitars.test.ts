import { guitars, loadComments, loadGuitarsList, setCurrentCatalogPage, setLoading } from './guitars';
import { makeFakeComment, makeFakeGuitar } from '../../utils/mocks';

const fakeGuitarsList = new Array(10).fill(null).map(() => makeFakeGuitar());
const fakeGuitarComments = new Array(10).fill(null).map(() => makeFakeComment());
const fakePageNumber = 3;
const randomId = '4';

const DEFAULT_STATE = {
  guitarsList: [],
  guitarsCount: 0,
  guitarsComments: {},
  loading: true,
  currentCatalogPage: 1,
};

describe('Reducer: offers', () => {
  it('without additional parameters should return initial state', () => {
    expect(guitars.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(DEFAULT_STATE);
  });

  it('should load guitars list, set guitar count and change the loading status to false', () => {
    expect(guitars.reducer(DEFAULT_STATE, loadGuitarsList(fakeGuitarsList)))
      .toEqual({
        guitarsList: fakeGuitarsList,
        guitarsCount: fakeGuitarsList.length,
        guitarsComments: {},
        loading: false,
        currentCatalogPage: 1,
      });
  });

  it('should load comments', () => {
    expect(guitars.reducer(DEFAULT_STATE, loadComments({guitarId: randomId, userComments: fakeGuitarComments})))
      .toEqual({
        guitarsList: [],
        guitarsCount: 0,
        guitarsComments: {'4': [...fakeGuitarComments]},
        loading: true,
        currentCatalogPage: 1,
      });
  });

  it('should set current catalog page', () => {
    expect(guitars.reducer(DEFAULT_STATE, setCurrentCatalogPage(fakePageNumber)))
      .toEqual({
        guitarsList: [],
        guitarsCount: 0,
        guitarsComments: {},
        loading: true,
        currentCatalogPage: fakePageNumber,
      });
  });

  it('should change loading status', () => {
    expect(guitars.reducer(DEFAULT_STATE, setLoading(false)))
      .toEqual({
        guitarsList: [],
        guitarsCount: 0,
        guitarsComments: {},
        loading: false,
        currentCatalogPage: 1,
      });
  });
});
