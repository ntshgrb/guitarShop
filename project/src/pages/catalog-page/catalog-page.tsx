import { useAppSelector } from '../../hooks';
import CatalogList from '../../components/catalog-list/catalog-list';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { NameSpace, Sorting } from '../../const';
import { useState, useMemo } from 'react';
import { Guitar } from '../../types/guitar';
import { GuitarToCartContext } from '../../store/guitar-to-cart-context';
import AddCartModal from '../../components/add-cart-modal/add-cart-modal';
import { toast } from 'react-toastify';
import { SortingOrderType, SortingType } from '../../types/catalog-settings-types';

function CatalogPage(): JSX.Element {
  const isDataLoading = useAppSelector((state) => state[NameSpace.guitars].loading);
  const addToCartIsOpen = useAppSelector((state) => state[NameSpace.utils].addToCartModal);

  const [ guitarToCart, setGuitarToCart ] = useState<Guitar | null>(null);
  const GuitarToCartContextValue = useMemo(() => ({guitarToCart, setGuitarToCart}), [guitarToCart]);

  const [ catalogSort, setCatalogSort ] = useState<SortingType>(null);
  const [ sortingOrder, setSortingOrder ] = useState<SortingOrderType>(null);

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
