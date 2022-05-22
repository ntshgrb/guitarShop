import { NameSpace } from '../../const';
import { useAppSelector } from '../../hooks';
import { getGuitarsByPage } from '../../store/selectors/selectors';
import CatalogCard from '../catalog-card/catalog-card';
import Pagination from '../pagination/pagination';

function CatalogList(): JSX.Element {
  const currentPage = useAppSelector((state) => state[NameSpace.guitars].currentCatalogPage);
  const currentGuitarsList = useAppSelector(getGuitarsByPage(currentPage));

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
