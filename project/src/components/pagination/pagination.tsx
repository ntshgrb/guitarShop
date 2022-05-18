import { useAppSelector } from '../../hooks';
import { MAX_GUITARS_COUNT } from '../../const';

function Pagination(): JSX.Element {
  const guitarsCount = useAppSelector((state) => state.GUITARS.guitarsCount);
  const currentCatalogPage = useAppSelector((state) => state.GUITARS.currentCatalogPage);
  const totalPages = Math.ceil(guitarsCount / MAX_GUITARS_COUNT);

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">

        {
          [...Array(totalPages).keys()].map( (page) => (
            <li key={page} className={`pagination__page ${currentCatalogPage === page +1 ? 'pagination__page--active' : ''}`}>
              <a className="link pagination__page-link" href="1">{page + 1}</a>
            </li>
          ))
        }

        <li className="pagination__page pagination__page--next" id="next">
          <a className="link pagination__page-link" href="2">Далее</a>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
