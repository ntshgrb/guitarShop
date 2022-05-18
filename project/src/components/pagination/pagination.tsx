import { useAppSelector } from '../../hooks';
import { AppRoute, MAX_GUITARS_COUNT } from '../../const';
import { Link } from 'react-router-dom';

function Pagination(): JSX.Element {
  const guitarsCount = useAppSelector((state) => state.GUITARS.guitarsCount);
  const currentCatalogPage = useAppSelector((state) => state.GUITARS.currentCatalogPage);
  const totalPages = Math.ceil(guitarsCount / MAX_GUITARS_COUNT);

  const onPageClick = (evt: any) => {
    // eslint-disable-next-line no-console
    console.log(evt.target.href);
  };

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">

        {
          [...Array(totalPages).keys()].map( (page) => (
            <li key={page} className={`pagination__page ${currentCatalogPage === page +1 ? 'pagination__page--active' : ''}`}>
              <Link
                onClick={onPageClick}
                className="link pagination__page-link"
                to={`${AppRoute.CatalogPage}page_${(page +1).toString()}`}
              >
                {page + 1}
              </Link>
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
