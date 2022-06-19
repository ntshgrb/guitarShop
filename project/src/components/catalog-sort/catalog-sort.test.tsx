import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import CatalogSort from './catalog-sort';
import { Sorting } from '../../const';


const mockStore = configureMockStore();

describe('Component: CatalogSort', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter >
        <Provider store={mockStore()}>
          <CatalogSort
            setCatalogSort={jest.fn}
            setSortingOrder={jest.fn}
            catalogSort={Sorting.price}
            sortingOrder={Sorting.asc}
          />
        </Provider>
      </BrowserRouter>,
    );

    const priceElement = screen.getByText('по цене');
    const popularityElement = screen.getByText('по популярности');

    expect(priceElement).toBeInTheDocument();
    expect(popularityElement).toBeInTheDocument();
  });
});
