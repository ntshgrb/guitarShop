import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeComment, fakeGuitarData } from '../../utils/mocks';
import { NameSpace } from '../../const';
import Comments from './comments';

const fakeComments =  new Array(3).fill(null).map(() => makeFakeComment());

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.currentGuitar]: {
    guitar: fakeGuitarData,
    comments: fakeComments,
    commentsCount: fakeComments.length,
  },
});

describe('component: Comments', () => {
  it('Should render correctly', async () => {
    render(
      <BrowserRouter >
        <Provider store={store}>
          <Comments setModalIsVisible={jest.fn} />
        </Provider>
      </BrowserRouter>,
    );

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();

    const commentsElements = await screen.findAllByText(/Комментарий:/i);
    expect(commentsElements).toHaveLength(fakeComments.length);

    const advElements = await screen.findAllByText(/Достоинства:/i);
    expect(advElements).toHaveLength(fakeComments.length);
  });
});
