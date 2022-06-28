import { datatype } from 'faker';
import { getPriceRange } from '../../utils/catalog-filter';
import { fakeGuitars } from '../../utils/mocks';
import { catalogFilter, setPriceRange, setUserPriceRange, setGuitarType, setStringsCount } from './catalog-filter';

const DEFAULT_STATE = {
  priceRange: {
    minPrice: null,
    maxPrice: null,
  },
  userPriceRange: {
    userMinPrice: null,
    userMaxPrice: null,
  },
  guitarType: null,
  stringsCount: null,
};

describe('Reducer: catalogFilter', () => {
  it('without additional parameters should return initial state', () => {
    expect(catalogFilter.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(DEFAULT_STATE);
  });

  it('should set set price range', () => {
    const {minPrice, maxPrice} = getPriceRange(fakeGuitars);
    expect(catalogFilter.reducer(DEFAULT_STATE, setPriceRange(fakeGuitars)))
      .toEqual({
        priceRange: {
          minPrice,
          maxPrice,
        },
        userPriceRange: {
          userMinPrice: null,
          userMaxPrice: null,
        },
        guitarType: null,
        stringsCount: null,
      });
  });

  it('should set set user price range', () => {
    const userPrice ={
      userMinPrice: datatype.number(),
      userMaxPrice: datatype.number(),
    };

    expect(catalogFilter.reducer(DEFAULT_STATE, setUserPriceRange(userPrice)))
      .toEqual({
        priceRange: {
          minPrice: null,
          maxPrice: null,
        },
        userPriceRange: {
          userMinPrice: userPrice.userMinPrice,
          userMaxPrice: userPrice.userMaxPrice,
        },
        guitarType: null,
        stringsCount: null,
      });
  });

  it('should set guitar type', () => {
    const checkedGuitarTypes = [datatype.string(), datatype.string()];

    expect(catalogFilter.reducer(DEFAULT_STATE, setGuitarType(checkedGuitarTypes)))
      .toEqual({
        priceRange: {
          minPrice: null,
          maxPrice: null,
        },
        userPriceRange: {
          userMinPrice: null,
          userMaxPrice: null,
        },
        guitarType: checkedGuitarTypes,
        stringsCount: null,
      });
  });

  it('should set strings count', () => {
    const checkedGuitarsStrings = [datatype.number(), datatype.number()];

    expect(catalogFilter.reducer(DEFAULT_STATE, setStringsCount(checkedGuitarsStrings)))
      .toEqual({
        priceRange: {
          minPrice: null,
          maxPrice: null,
        },
        userPriceRange: {
          userMinPrice: null,
          userMaxPrice: null,
        },
        guitarType: null,
        stringsCount: checkedGuitarsStrings,
      });
  });
});
