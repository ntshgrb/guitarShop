import { useAppSelector } from '../../hooks';
import CatalogList from '../../components/catalog-list/catalog-list';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { NameSpace } from '../../const';

function CatalogPage(): JSX.Element {
  const isDataLoading = useAppSelector((state) => state[NameSpace.guitars].loading);

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Каталог гитар</h1>

        <Breadcrumbs />

        <div className="catalog">

          <CatalogFilter />

          <CatalogSort />

          {
            isDataLoading? (
              <p>Loading...</p>
            ) : (
              <CatalogList />
            )
          }

        </div>
      </div>
    </main>
  );
}

export default CatalogPage;
