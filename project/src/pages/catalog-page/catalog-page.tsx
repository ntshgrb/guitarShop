import { useAppSelector } from '../../hooks';
import CatalogList from '../../components/catalog-list/catalog-list';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';

function CatalogPage(): JSX.Element {
  const isDataLoading = useAppSelector((state) => state.GUITARS.loading);

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
        <ul className="breadcrumbs page-content__breadcrumbs">
          <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a>
          </li>
          <li className="breadcrumbs__item"><a className="link">Каталог</a>
          </li>
        </ul>
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
