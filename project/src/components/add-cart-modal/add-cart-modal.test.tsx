import { BrowserRouter } from 'react-router-dom';
import AddCartModal from './add-cart-modal';
import { render, screen } from '@testing-library/react';
import { fakeGuitarData } from '../../utils/mocks';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';

describe('component: AddCartModal', () => {
  it('Should render correctly', () => {
    const mockStore = configureMockStore();

    render(
      <Provider store={mockStore()}>
        <BrowserRouter >
          <AddCartModal guitar={fakeGuitarData} />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/струнная/i)).toBeInTheDocument();
    expect(screen.getByText(/Артикул:/i)).toBeInTheDocument();
    expect(screen.getByText(/Цена:/i)).toBeInTheDocument();
  });
});
