import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fakeGuitarData, fakeGuitars, fakeGuitarsComments } from '../../utils/mocks';
import { NameSpace } from '../../const';
import Pagination from './pagination';
import { datatype } from 'faker';

describe('component: Pagination', () => {
  it('Should render 2 pages correctly', () => {

    const mockStore = configureMockStore();

    const store = mockStore({
      [NameSpace.guitars]: {
        guitarsList: fakeGuitars,
        guitarsCount: fakeGuitars.length,
        guitarsComments: fakeGuitarsComments,
        loading: false,
        currentCatalogPage: 1,
      },
    });

    render(
      <BrowserRouter >
        <Provider store={store}>
          <Pagination currentCatalogPage={datatype.number()} guitarsCount={datatype.number()} />
        </Provider>
      </BrowserRouter>,
    );

    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/2/i)).toBeInTheDocument();
    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
  });

  it('Should render 1 page correctly', () => {

    const mockStore = configureMockStore();

    const store = mockStore({
      [NameSpace.guitars]: {
        guitarsList: [fakeGuitarData],
        guitarsCount: 1,
        guitarsComments: fakeGuitarsComments,
        loading: false,
        currentCatalogPage: 1,
      },
    });

    render(
      <BrowserRouter >
        <Provider store={store}>
          <Pagination currentCatalogPage={datatype.number()} guitarsCount={datatype.number()}/>
        </Provider>
      </BrowserRouter>,
    );

    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.queryByText('Далее')).toBeNull();
  });
});
