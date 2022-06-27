import { Dispatch, SetStateAction } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppRoute, Sorting } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setCurrentCatalogPage } from '../../store/reducers/guitars';
import { SortingOrderType, SortingType } from '../../types/catalog-settings-types';

type CatalogSortType = {
  setCatalogSort: Dispatch<SetStateAction<SortingType>>;
  setSortingOrder: Dispatch<SetStateAction<SortingOrderType>>;
  catalogSort: SortingType;
  sortingOrder: SortingOrderType;
}

function CatalogSort({ setCatalogSort, setSortingOrder, catalogSort, sortingOrder }: CatalogSortType): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [ searchParams ] = useSearchParams();

  const handleSettingsChange = () => {
    dispatch(setCurrentCatalogPage(1));
    navigate(AppRoute.CatalogMain, {state: searchParams.toString()});
  };

  const onPriceClick = () => {
    setCatalogSort(Sorting.price);
    handleSettingsChange();
  };

  const onPopularityClick = () => {
    setCatalogSort(Sorting.popularity);
    handleSettingsChange();
  };

  const onAscSortingClick = () => {
    setSortingOrder(Sorting.asc);
    handleSettingsChange();
  };

  const onDescSortingClick = () => {
    setSortingOrder(Sorting.desc);
    handleSettingsChange();
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          onClick={onPriceClick}
          className={(catalogSort === Sorting.price) ?
            'catalog-sort__type-button catalog-sort__type-button--active' :
            'catalog-sort__type-button'}
          aria-label="по цене"
        >по цене
        </button>
        <button
          onClick={onPopularityClick}
          className={(catalogSort === Sorting.popularity) ?
            'catalog-sort__type-button catalog-sort__type-button--active' :
            'catalog-sort__type-button'}
          aria-label="по популярности"
        >по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          onClick={onAscSortingClick}
          className={sortingOrder === Sorting.asc ?
            'catalog-sort__order-button catalog-sort__order-button--up catalog-sort__order-button--active' :
            'catalog-sort__order-button catalog-sort__order-button--up'}
          aria-label="По возрастанию"
        >
        </button>
        <button
          onClick={onDescSortingClick}
          className={sortingOrder === Sorting.desc ?
            'catalog-sort__order-button catalog-sort__order-button--down catalog-sort__order-button--active' :
            'catalog-sort__order-button catalog-sort__order-button--down'}
          aria-label="По убыванию"
        >
        </button>
      </div>
    </div>
  );
}

export default CatalogSort;

