import { RemoveScroll } from 'react-remove-scroll';
import FocusLock from 'react-focus-lock';
import './add-cart-success-modal.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { toggleAddToCartSuccess } from '../../store/reducers/utils';
import { isEscKey } from '../../utils/utils';
import { useEffect } from 'react';

function AddCartSuccessModal(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const onToCartClick = () => {
    dispatch(toggleAddToCartSuccess(false));
    navigate(AppRoute.Cart);
  };

  const onContinueClick = () => {
    dispatch(toggleAddToCartSuccess(false));
    if(location.pathname.includes(AppRoute.ProductPage)) {
      navigate(AppRoute.CatalogMain);
    }
  };

  const documentKeyDownHandler = (event: KeyboardEvent) => {
    if (isEscKey(event)) {
      dispatch(toggleAddToCartSuccess(false));
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', documentKeyDownHandler);
    document.querySelector('.modal__overlay')?.addEventListener('click', () => dispatch(toggleAddToCartSuccess(false)));
    return () => {
      document.removeEventListener('keydown', documentKeyDownHandler);
    };
  });

  return (
    <RemoveScroll>
      <FocusLock>
        <div className="add-cart-success-modal">
          <div className="modal is-active modal--success modal-for-ui-kit">
            <div className="modal__wrapper">
              <div className="modal__overlay" data-close-modal></div>
              <div className="modal__content">
                <svg className="modal__icon" width="26" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-success"></use>
                </svg>
                <p className="modal__message">Товар успешно добавлен в корзину</p>
                <div className="modal__button-container modal__button-container--add">
                  <button
                    onClick={onToCartClick}
                    className="button button--small modal__button"
                  >Перейти в корзину
                  </button>
                  <button
                    onClick={onContinueClick}
                    className="button button--black-border button--small modal__button modal__button--right"
                  >Продолжить покупки
                  </button>
                </div>
                <button
                  onClick={() => dispatch(toggleAddToCartSuccess(false))}
                  className="modal__close-btn button-cross"
                  type="button"
                  aria-label="Закрыть"
                >
                  <span className="button-cross__icon"></span>
                  <span className="modal__close-btn-interactive-area"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </FocusLock>
    </RemoveScroll>
  );}

export default AddCartSuccessModal;
