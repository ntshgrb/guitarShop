import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import CatalogFilter from './catalog-filter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';


const mockStore = configureMockStore();

describe('Component: CatalogFilter', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter >
        <Provider store={mockStore()}>
          <CatalogFilter />
        </Provider>
      </BrowserRouter>,
    );

    const minPriceElement = screen.getByText('Минимальная цена');
    const maxPriceElement = screen.getByText('Максимальная цена');

    expect(minPriceElement).toBeInTheDocument();
    expect(maxPriceElement).toBeInTheDocument();
  });
});
