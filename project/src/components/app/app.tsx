import Layout from '../layout/layout';
import Catalog from '../../pages/catalog-page/catalog-page';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import ProductPage from '../../pages/product-page/product-page';
import NotFoundPage from '../../pages/not-found/not-found-page';
import CartPage from '../../pages/cart-page/cart-page';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoute.Root} element={<Layout />}>
        <Route index element={<Navigate to={AppRoute.CatalogMain} />} />
        <Route path={AppRoute.CatalogMain} element={<Catalog />} />
        <Route path={AppRoute.Catalog} element={<Catalog />} />
        <Route path={AppRoute.ProductPageId} element={<ProductPage />} />
        <Route path={AppRoute.Cart} element={<CartPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
