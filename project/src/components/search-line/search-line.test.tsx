import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { NameSpace } from '../../const';
import { fakeGuitars } from '../../utils/mocks';
import SearchLine from './search-line';

describe('component: SearchLine', () => {
  it('Should render correctly', () => {
    const mockStore = configureMockStore();

    const store = mockStore({
      [NameSpace.guitars]: {
        guitarsList: fakeGuitars,
      },
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <SearchLine />
        </Provider>
      </BrowserRouter>,
    );

    expect(screen.getByText('Начать поиск')).toBeInTheDocument();
    expect(screen.getByText('Поиск')).toBeInTheDocument();
    expect(screen.getByText('Сбросить поиск')).toBeInTheDocument();
  });
});
