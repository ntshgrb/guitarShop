import { useAppSelector } from '../../hooks';
import CatalogList from '../../components/catalog-list/catalog-list';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { AppRoute, NameSpace, Sorting, SortSearch } from '../../const';
import { useState, useMemo, useEffect } from 'react';
import { Guitar } from '../../types/guitar';
import { GuitarToCartContext } from '../../store/guitar-to-cart-context';
import AddCartModal from '../../components/add-cart-modal/add-cart-modal';
import { toast } from 'react-toastify';
import { SortingOrderType, SortingType } from '../../types/catalog-settings-types';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function CatalogPage(): JSX.Element {
  const isDataLoading = useAppSelector((state) => state[NameSpace.guitars].loading);
  const addToCartIsOpen = useAppSelector((state) => state[NameSpace.utils].addToCartModal);

  const [ guitarToCart, setGuitarToCart ] = useState<Guitar | null>(null);
  const GuitarToCartContextValue = useMemo(() => ({guitarToCart, setGuitarToCart}), [guitarToCart]);

  const [ catalogSort, setCatalogSort ] = useState<SortingType>(null);
  const [ sortingOrder, setSortingOrder ] = useState<SortingOrderType>(null);

  const navigate = useNavigate();
  const params = useParams();

  const location = useLocation();
  useEffect(() => {
    if (location.search) {
      const sortIndex = (location.search).indexOf(SortSearch.sort);
      const orderIndex = (location.search).indexOf(SortSearch.order);

      const sortValue = (location.search.slice(sortIndex + (SortSearch.sort).length, orderIndex - 1))?.toUpperCase() as SortingType;
      const orderValue = (location.search.slice(orderIndex + (SortSearch.order).length) as SortingOrderType)?.toUpperCase() as SortingOrderType;

      setCatalogSort(sortValue);
      setSortingOrder(orderValue);
    }
  }, []);


  useEffect( () => {
    if (catalogSort !== null) {
      navigate({
        pathname: params.pageNumber ? `${AppRoute.CatalogMain}/${params.pageNumber}` : AppRoute.CatalogMain,
        search: `${SortSearch.sort}${catalogSort.toLowerCase()}&${SortSearch.order}${sortingOrder?.toLowerCase()}`,
      });
    }
  }, [catalogSort, sortingOrder, navigate]);

  if (catalogSort && !sortingOrder) {
    setSortingOrder(Sorting.asc);
  }

  if (sortingOrder && !catalogSort) {
    setCatalogSort(Sorting.price);
  }

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Каталог гитар</h1>

        <Breadcrumbs />

        <div className="catalog">

          <CatalogFilter />

          <CatalogSort
            setCatalogSort={setCatalogSort}
            setSortingOrder={setSortingOrder}
            catalogSort={catalogSort}
            sortingOrder={sortingOrder}
          />

          {
            isDataLoading? (
              <p>Loading...</p>
            ) : (
              <GuitarToCartContext.Provider value={GuitarToCartContextValue}>
                <CatalogList
                  sortingType={catalogSort}
                  sortingOrder={sortingOrder}
                />
              </GuitarToCartContext.Provider>
            )
          }

          {
            addToCartIsOpen && guitarToCart ? <AddCartModal guitar={guitarToCart} /> : null
          }

          {
            addToCartIsOpen && !guitarToCart ? toast.info('Произошла ошибка, невозможно добавить товар в корзину') : null
          }

        </div>
      </div>
    </main>
  );
}

export default CatalogPage;
