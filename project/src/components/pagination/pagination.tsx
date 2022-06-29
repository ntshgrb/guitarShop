import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, MAX_GUITARS_COUNT, NameSpace } from '../../const';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { setCurrentCatalogPage } from '../../store/reducers/guitars';
import { useEffect } from 'react';

type PaginationProps = {
  guitarsCount: number,
}

function Pagination({guitarsCount}: PaginationProps): JSX.Element {
  const dispatch = useAppDispatch();
  const param = useParams();
  const [searchParams] = useSearchParams();
  const currentCatalogPage = useAppSelector((state) => state[NameSpace.guitars].currentCatalogPage);

  const totalPages = Math.ceil(guitarsCount / MAX_GUITARS_COUNT);

  let pageNumber: number | null = null;

  if (param.pageNumber) {
    pageNumber = + param.pageNumber.replace('page_', '');
  }

  useEffect(() => {
    if (pageNumber !== null && pageNumber !== currentCatalogPage) {
      dispatch(setCurrentCatalogPage(pageNumber));
    }
  }, [currentCatalogPage, dispatch, pageNumber]);

  const onPageClick = (page: number) => {
    dispatch(setCurrentCatalogPage(page));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
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
                state={searchParams.toString()}
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
                state={searchParams.toString()}
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
                onClick={() => {onPageClick(currentCatalogPage + 1);}}
                className="link pagination__page-link"
                to={`${AppRoute.CatalogPageNumber}${(currentCatalogPage + 1).toString()}`}
                state={searchParams.toString()}
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
