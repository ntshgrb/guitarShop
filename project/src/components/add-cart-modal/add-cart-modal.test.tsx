import { BrowserRouter } from 'react-router-dom';
import AddCartModal from './add-cart-modal';
import { render, screen } from '@testing-library/react';
import { fakeGuitarData } from '../../utils/mocks';

describe('component: AddCartModal', () => {
  it('Should render correctly', () => {

    render(
      <BrowserRouter >
        <AddCartModal guitar={fakeGuitarData} />
      </BrowserRouter>,
    );

    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/струнная/i)).toBeInTheDocument();
    expect(screen.getByText(/Артикул:/i)).toBeInTheDocument();
    expect(screen.getByText(/Цена:/i)).toBeInTheDocument();
  });
});
