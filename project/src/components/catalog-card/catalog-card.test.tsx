import { BrowserRouter } from 'react-router-dom';
import CatalogCard from './catalog-card';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fakeGuitarData, fakeGuitars, fakeGuitarsComments, fakeCartItem } from '../../utils/mocks';
import * as Redux from 'react-redux';
import { NameSpace } from '../../const';

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

describe('component: CatalogCard', () => {
  it('Should render correctly', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    const fakeCartList = [fakeCartItem];
    useDispatch.mockReturnValue(dispatch);

    render(
      <BrowserRouter >
        <Provider store={store}>
          <CatalogCard guitarItem={fakeGuitarData} cartList={fakeCartList}/>
        </Provider>
      </BrowserRouter>,
    );

    expect(screen.getByText(fakeGuitarData.name)).toBeInTheDocument();
    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
    expect(useDispatch).toBeCalledTimes(1);
  });
});
