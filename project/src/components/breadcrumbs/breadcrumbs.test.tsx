import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Breadcrumbs from './breadcrumbs';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';


const mockStore = configureMockStore();

describe('Component: Breadcrumbs', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter >
        <Provider store={mockStore()}>
          <Breadcrumbs />
        </Provider>
      </BrowserRouter>,
    );

    const mainPageElement = screen.getByText('Главная');
    const catalogPageElement = screen.getByText('Каталог');

    expect(mainPageElement).toBeInTheDocument();
    expect(catalogPageElement).toBeInTheDocument();
  });
});
