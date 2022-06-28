import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { datatype } from 'faker';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { NameSpace } from '../../const';
import PriceRange from './price-range';

describe('component: PriceRange', () => {
  it('Should render correctly', () => {
    const mockStore = configureMockStore();

    const store = mockStore({
      [NameSpace.catalogFilter]: {
        priceRange: {
          minPrice: datatype.number(),
          maxPrice: datatype.number(),
        },
      },
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <PriceRange resetData={false} setResetPrice={jest.fn()} />
        </Provider>
      </BrowserRouter>,
    );

    expect(screen.getByText('Максимальная цена')).toBeInTheDocument();
    expect(screen.getByText('Минимальная цена')).toBeInTheDocument();
  });
});
