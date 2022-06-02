import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import CommentSentModal from './comment-sent-modal';

const mockStore = configureMockStore();

describe('component: CommentSentModal', () => {
  it('Should render correctly', () => {

    render(
      <BrowserRouter >
        <Provider store={mockStore()}>
          <CommentSentModal setModalSuccessVisible={jest.fn} />
        </Provider>
      </BrowserRouter>,
    );

    expect(screen.getByText(/Спасибо за ваш отзыв!/i)).toBeInTheDocument();
  });
});
