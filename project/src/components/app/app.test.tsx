import {configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute, NameSpace } from '../../const';
import { createAPI } from '../../services/api';
import { fakeGuitars, fakeGuitarsComments, fakeComments, fakeGuitarData, fakeCartItem } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import App from './app';
import thunk from 'redux-thunk';
import { datatype } from 'faker';

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
  [NameSpace.utils]: {
    addToCartModal: false,
  },
  [NameSpace.cart]: {
    cartList: [fakeCartItem],
    coupon: null,
  },
  [NameSpace.catalogFilter]: {
    priceRange: {
      minPrice: 1700,
      maxPrice: 15000,
    },
  },
});
const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Layout" and "Catalog" when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Режим работы:/i)).toBeInTheDocument();
    expect(screen.getByText(/м. Невский проспект,/i)).toBeInTheDocument();
    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
  });

  it('should render "Catalog" when user navigate to "/catalog"', () => {
    history.push(AppRoute.CatalogMain);

    render(fakeApp);

    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Режим работы:/i)).toBeInTheDocument();
    expect(screen.getByText(/м. Невский проспект,/i)).toBeInTheDocument();
    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
  });

  it('should render "Catalog" when user navigate to "/catalog:page_number"', () => {
    history.push(`${AppRoute.CatalogMain}/${datatype.number()}`);

    render(fakeApp);

    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Режим работы:/i)).toBeInTheDocument();
    expect(screen.getByText(/м. Невский проспект,/i)).toBeInTheDocument();
    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
  });

  it('should render "ProductPage" when user navigate to "/guitar/:id"', () => {
    history.push(`${AppRoute.ProductPage}${fakeGuitarData.id}`);
    const fakeStore = mockStore({
      [NameSpace.currentGuitar]: {
        guitar: fakeGuitarData,
        comments: fakeComments,
        commentsCount: fakeComments.length,
      },
      [NameSpace.utils]: {
        addToCartModal: false,
      },
      [NameSpace.cart]: {
        cartList: [fakeCartItem],
        coupon: null,
      },
      [NameSpace.guitars]: {
        guitarsList: fakeGuitars,
      },
    });

    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Режим работы:/i)).toBeInTheDocument();
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Наверх/i)).toBeInTheDocument();
    expect(screen.getByText(/Цена:/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип/i)).toBeInTheDocument();
    expect(screen.getByText(/Артикул:/i)).toBeInTheDocument();
    expect(screen.getByText(/Количество струн:/i)).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigates to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText(/Страница не найдена./i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться на главную/i)).toBeInTheDocument();
  });
});
