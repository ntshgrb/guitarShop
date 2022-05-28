import Layout from '../layout/layout';
import Catalog from '../../pages/catalog-page/catalog-page';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import ProductPage from '../../pages/catalog-page/product-page';
import NotFoundPage from '../../pages/not-found/not-found-page';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route index element={<Navigate to={AppRoute.DefaultCatalogPage} />} />
          <Route path={AppRoute.CatalogPage} element={<Catalog />} />
          <Route path={AppRoute.ProductPageId} element={<ProductPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
