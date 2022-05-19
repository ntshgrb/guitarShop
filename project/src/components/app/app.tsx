import Layout from '../layout/layout';
import Catalog from '../../pages/catalog-page/catalog-page';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route index element={<Navigate to={AppRoute.DefaultCatalogPage} />} />
          <Route path={AppRoute.CatalogPage} element={<Catalog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
