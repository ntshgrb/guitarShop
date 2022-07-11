import React, { memo } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { AppRoute, NameSpace } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentCatalogPage } from '../../store/reducers/guitars';
import SearchLine from '../search-line/search-line';
import './header.css';

function Header(): JSX.Element {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const cartList = useAppSelector((state) => state[NameSpace.cart].cartList);
  const cartListCount = cartList.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);

  const onLinkClick = () => {
    dispatch(setCurrentCatalogPage(1));
  };

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <NavLink
          onClick={onLinkClick}
          to={AppRoute.Root}
          className={`header__logo logo ${/catalog$/.test(location.pathname) ? 'header__logo--disabled' : ''}`}
        >
          <img className="logo__img" width="70" height="70" src="../img/svg/logo.svg" alt="Логотип" />
        </NavLink>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <NavLink
                to={AppRoute.CatalogMain}
                onClick={onLinkClick}
                className={({isActive}) => isActive? 'link main-nav__link link--current' : 'link main-nav__link'}
              >Каталог
              </NavLink>
            </li>
            <li><a className="link main-nav__link" href="#">Где купить?</a>
            </li>
            <li><a className="link main-nav__link" href="#">О компании</a>
            </li>
          </ul>
        </nav>
        <SearchLine />
        <Link to={AppRoute.Cart} className="header__cart-link" aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg><span className="visually-hidden">Перейти в корзину</span>

          {
            cartListCount ? <span className="header__cart-count">{cartListCount}</span> : null
          }

        </Link>
      </div>
    </header>
  );
}

export default memo(Header);
