import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { fakeGuitarData } from '../../utils/mocks';
import AddCommentModal from './add-comment-modal';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');
useDispatch.mockReturnValue(dispatch);

describe('component: AddCommentModal', () => {
  it('Should render correctly', () => {

    render(
      <BrowserRouter >
        <Provider store={mockStore()}>
          <AddCommentModal setModalIsVisible={jest.fn} setModalSuccessVisible={jest.fn} productName={fakeGuitarData.name} productId={fakeGuitarData.id}/>
        </Provider>
      </BrowserRouter>,
    );

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    expect(screen.getByText(/Ваше Имя/i)).toBeInTheDocument();
    expect(screen.getByText(/Недостатки/i)).toBeInTheDocument();
    expect(screen.getByText(/Ваша Оценка/i)).toBeInTheDocument();

    userEvent.click(screen.getByText(/Отправить отзыв/i));
    expect(useDispatch).toBeCalledTimes(2);
  });
});
