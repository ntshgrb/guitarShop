import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import AddCartSuccessModal from './add-cart-success-modal';

describe('component: AddCartSuccessModal', () => {
  it('should render correctly', () => {
    const mockStore = configureMockStore();

    render(
      <Provider store={mockStore()}>
        <BrowserRouter >
          <AddCartSuccessModal />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Продолжить покупки/i)).toBeInTheDocument();
  });
});
