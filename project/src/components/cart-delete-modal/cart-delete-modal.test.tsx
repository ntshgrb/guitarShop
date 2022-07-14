import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import CartDeleteModal from './cart-delete-modal';
import { fakeItemToDelete } from '../../utils/mocks';

describe('component: AddCartSuccessModal', () => {
  it('should render correctly', () => {
    const mockStore = configureMockStore();

    render(
      <Provider store={mockStore()}>
        <BrowserRouter >
          <CartDeleteModal toggle={jest.fn()} itemToDelete={fakeItemToDelete}/>
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Удалить этот товар?/i)).toBeInTheDocument();
    expect(screen.getByText(/Артикул/i)).toBeInTheDocument();
    expect(screen.getByText(/Цена/i)).toBeInTheDocument();
    expect(screen.getByText(/Продолжить покупки/i)).toBeInTheDocument();
    expect(screen.getByText(/Удалить товар/i)).toBeInTheDocument();
  });
});
