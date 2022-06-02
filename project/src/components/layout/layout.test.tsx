import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import Layout from './layout';


const mockStore = configureMockStore();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter >
        <Provider store={mockStore()}>
          <Layout />
        </Provider>
      </BrowserRouter>,
    );

    const headerElement = screen.getByText('Каталог');
    const footerElement = screen.getByText('8-812-500-50-50');

    expect(headerElement).toBeInTheDocument();
    expect(footerElement).toBeInTheDocument();
  });
});
