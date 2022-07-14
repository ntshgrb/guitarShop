import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { datatype } from 'faker';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { NameSpace } from '../../const';
import { fakeComments, fakeCartList, fakeGuitars } from '../../utils/mocks';
import CatalogPage from './catalog-page';
import * as Redux from 'react-redux';

describe('component: CatalogPage', () => {
  it('Should render correctly', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    const mockStore = configureMockStore();

    const store = mockStore({
      [NameSpace.guitars]: {
        loading: false,
        currentCatalogPage: 1,
        guitarsList: fakeGuitars,
        guitarsComments: fakeComments,
      },
      [NameSpace.utils]: {
        addToCartModal: false,
      },
      [NameSpace.catalogFilter]: {
        priceRange: {
          minPrice: datatype.number(),
          maxPrice: datatype.number(),
        },
      },
      [NameSpace.cart]: {
        cartList: fakeCartList,
      },
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <CatalogPage />
        </Provider>
      </BrowserRouter>,
    );

    expect(screen.getByText('Каталог гитар')).toBeInTheDocument();
  });
});
