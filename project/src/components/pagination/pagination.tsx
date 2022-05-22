import { useAppSelector, useAppDispatch } from '../../hooks';
import { AppRoute, MAX_GUITARS_COUNT } from '../../const';
import { Link, useParams } from 'react-router-dom';
import { setCurrentCatalogPage } from '../../store/reducers/guitars';


function Pagination(): JSX.Element {
  const dispatch = useAppDispatch();
  const param = useParams();

  const guitarsCount = useAppSelector((state) => state.GUITARS.guitarsCount);
  const currentCatalogPage = useAppSelector((state) => state.GUITARS.currentCatalogPage);
  const totalPages = Math.ceil(guitarsCount / MAX_GUITARS_COUNT);

  if (param.id && +param.id !== currentCatalogPage) {
    setCurrentCatalogPage(+param.id);
  }

  const onPageClick = (page: number) => {
    dispatch(setCurrentCatalogPage(page));
  };

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">


        {
          (currentCatalogPage > 1) ? (
            <li className="pagination__page pagination__page--prev" id="prev">
              <Link
                onClick={() => onPageClick(currentCatalogPage - 1)}
                className="link pagination__page-link"
                to={ `${AppRoute.CatalogPageNumber}${(currentCatalogPage - 1).toString()}`}
              >
                  Назад
              </Link>
            </li>) : ''
        }

        {
          [...Array(totalPages).keys()].map( (page) => (
            <li key={page} className={`pagination__page ${currentCatalogPage === page + 1 ? 'pagination__page--active' : ''}`}>
              <Link
                onClick={() => onPageClick(page + 1)}
                className="link pagination__page-link"
                to={`${AppRoute.CatalogPageNumber}${( page + 1 ).toString()}`}
              >
                {page + 1}
              </Link>
            </li>
          ))
        }

        {
          (currentCatalogPage < totalPages) ? (
            <li className="pagination__page pagination__page--next" id="next">
              <Link
                onClick={() => onPageClick(currentCatalogPage + 1)}
                className="link pagination__page-link"
                to={`${AppRoute.CatalogPageNumber}${(currentCatalogPage + 1).toString()}`}
              >
                  Далее
              </Link>
            </li>) : ''
        }

      </ul>
    </div>
  );
}

export default Pagination;