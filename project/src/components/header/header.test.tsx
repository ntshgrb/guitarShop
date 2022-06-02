import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import Header from './header';


const mockStore = configureMockStore();

describe('Component: Header', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter >
        <Provider store={mockStore()}>
          <Header />
        </Provider>
      </BrowserRouter>,
    );

    const catalogLinkElement = screen.getByText('Каталог');
    const addressLinkElement = screen.getByText('Где купить?');
    const aboutLinkElement = screen.getByText('О компании');


    expect(catalogLinkElement).toBeInTheDocument();
    expect(addressLinkElement).toBeInTheDocument();
    expect(aboutLinkElement).toBeInTheDocument();

  });
});
