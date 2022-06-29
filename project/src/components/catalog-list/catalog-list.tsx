import { useEffect } from 'react';
import { NameSpace } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setPriceRange } from '../../store/reducers/catalog-filter';
import { setGuitarsCount } from '../../store/reducers/guitars';
import { getGuitarsByPage } from '../../store/selectors/selectors';
import { SortingOrderType, SortingType } from '../../types/catalog-settings-types';
import CatalogCard from '../catalog-card/catalog-card';
import Pagination from '../pagination/pagination';

type CataloListProps = {
  sortingType: SortingType;
  sortingOrder: SortingOrderType;
}

function CatalogList( { sortingType, sortingOrder }: CataloListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCatalogPage = useAppSelector((state) => state[NameSpace.guitars].currentCatalogPage);


  const {currentGuitarsList, guitarsCount} = useAppSelector(getGuitarsByPage(currentCatalogPage, {sortingType, sortingOrder}));

  useEffect(() => {
    dispatch(setGuitarsCount(guitarsCount));
    dispatch(setPriceRange(currentGuitarsList));
  }, [dispatch, guitarsCount, currentGuitarsList]);

  if (currentGuitarsList.length === 0) {
    return (
      <p>Ничего не найдено</p>
    );
  }

  return (
    <>
      <div className="cards catalog__cards">
        {
          currentGuitarsList.map( (guitar) => <CatalogCard guitarItem={guitar} key={guitar.id}/>)
        }
      </div>
      <Pagination currentCatalogPage={currentCatalogPage} guitarsCount={guitarsCount}/>
    </>
  );
}

export default CatalogList;
