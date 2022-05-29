import { memo } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';

type BreadcrumbsProps = {
  name?: string;
}

function Breadcrumbs({ name }: BreadcrumbsProps): JSX.Element {
  const location = useLocation();
  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item">
        <Link className="link" to={AppRoute.Root}>Главная</Link>
      </li>
      <li className="breadcrumbs__item">
        <NavLink className="link" to={AppRoute.DefaultCatalogPage}>Каталог</NavLink>
      </li>
      {
        location.pathname.includes('/guitar/') ? (
          <li className="breadcrumbs__item">
            <a className="link">{name}</a>
          </li>) :
          null
      }
    </ul>
  );
}

export default memo(Breadcrumbs);
