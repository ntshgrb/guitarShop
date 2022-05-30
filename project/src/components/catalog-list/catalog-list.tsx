import { useEffect } from 'react';
import { NameSpace } from '../../const';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { fetchGuitarComments } from '../../store/api-actions';
import { getGuitarsByPage } from '../../store/selectors/selectors';
import CatalogCard from '../catalog-card/catalog-card';
import Pagination from '../pagination/pagination';

function CatalogList(): JSX.Element {
  const currentPage = useAppSelector((state) => state[NameSpace.guitars].currentCatalogPage);
  const currentGuitarsList = useAppSelector(getGuitarsByPage(currentPage));

  useEffect(() => {
    for (const guitar of currentGuitarsList) {
      store.dispatch(fetchGuitarComments(guitar.id));
    }
  }, [currentGuitarsList]);

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
