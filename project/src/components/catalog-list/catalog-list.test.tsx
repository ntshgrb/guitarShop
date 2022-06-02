import { BrowserRouter } from 'react-router-dom';
import CatalogList from './catalog-list';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { fakeGuitars, fakeGuitarsComments } from '../../utils/mocks';
import { NameSpace } from '../../const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  [NameSpace.guitars]: {
    guitarsList: fakeGuitars,
    guitarsCount: fakeGuitars.length,
    guitarsComments: fakeGuitarsComments,
    loading: false,
    currentCatalogPage: 1,
  },
});

describe('component: CatalogList', () => {
  it('Should render correctly', () => {

    render(
      <BrowserRouter >
        <Provider store={store}>
          <CatalogList  />
        </Provider>
      </BrowserRouter>,
    );

    expect(screen.getByText(fakeGuitars[0].name)).toBeInTheDocument();
    expect(screen.getByText(fakeGuitars[3].name)).toBeInTheDocument();
  });
});
