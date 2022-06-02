import { toggleAddToCartModal, utils } from './utils';

const DEFAULT_STATE = {
  addToCartModal: false,
};

describe('Reducer: utils', () => {
  it('without additional parameters should return initial state', () => {
    expect(utils.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(DEFAULT_STATE);
  });

  it('should change modal visibulity status', () => {
    expect(utils.reducer(DEFAULT_STATE, toggleAddToCartModal(true)))
      .toEqual({
        addToCartModal: true,
      });
  });
});
