import { NameSpace } from '../../const';
import { useAppSelector } from '../../hooks';
import { getGuitarsByPage } from '../../store/selectors/selectors';
import { SortingOrderType, SortingType } from '../../types/catalog-settings-types';
import CatalogCard from '../catalog-card/catalog-card';
import Pagination from '../pagination/pagination';

type CataloListProps = {
  sortingType: SortingType;
  sortingOrder: SortingOrderType;
}

function CatalogList( { sortingType, sortingOrder }: CataloListProps): JSX.Element {
  const currentPage = useAppSelector((state) => state[NameSpace.guitars].currentCatalogPage);

  const currentGuitarsList = useAppSelector(getGuitarsByPage(currentPage, {sortingType, sortingOrder}));

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
      <Pagination />
    </>
  );
}

export default CatalogList;
