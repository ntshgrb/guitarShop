import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Footer from './footer';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';


const mockStore = configureMockStore();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter >
        <Provider store={mockStore()}>
          <Footer />
        </Provider>
      </BrowserRouter>,
    );

    const contactsElement = screen.getByText('Контакты');
    const phoneElement = screen.getByText('8-812-500-50-50');
    const timeElement = screen.getByText('с 11:00 до 20:00');


    expect(contactsElement).toBeInTheDocument();
    expect(phoneElement).toBeInTheDocument();
    expect(timeElement).toBeInTheDocument();

  });
});
