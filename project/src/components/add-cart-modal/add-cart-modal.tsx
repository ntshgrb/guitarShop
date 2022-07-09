import { useEffect } from 'react';
import FocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';
import { guitarTypes } from '../../const';
import { useAppDispatch } from '../../hooks';
import { addToCart } from '../../store/reducers/cart';
import { toggleAddToCartModal, toggleAddToCartSuccess } from '../../store/reducers/utils';
import { Guitar } from '../../types/guitar';
import { getFormattedPrice, getPreviewImage, isEscKey } from '../../utils/utils';
import './add-cart-modal.css';

type AddCartModalProps = {
    guitar: Guitar;
}

function AddCartModal({ guitar }: AddCartModalProps): JSX.Element {
  const dispatch = useAppDispatch();

  const { name, vendorCode, type, stringCount, price, previewImg } = guitar as Guitar;
  const guitarPrice = getFormattedPrice(price);
  const guitarImage = getPreviewImage(previewImg);

  const documentKeyDownHandler = (event: KeyboardEvent) => {
    if (isEscKey(event)) {
      dispatch(toggleAddToCartModal(false));
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', documentKeyDownHandler);
    document.querySelector('.modal__overlay')?.addEventListener('click', () => dispatch(toggleAddToCartModal(false)));
    return () => {
      document.removeEventListener('keydown', documentKeyDownHandler);
    };
  });

  const onAddToCart = () => {
    dispatch(addToCart(guitar));
    dispatch(toggleAddToCartModal(false));
    dispatch(toggleAddToCartSuccess(true));
  };

  return (
    <RemoveScroll>
      <FocusLock>
        <div className="add-cart-modal">
          <div className="modal is-active modal--success modal-for-ui-kit">
            <div className="modal__wrapper">
              <div className="modal__overlay" data-close-modal></div>
              <div className="modal__content">
                <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
                <div className="modal__info">
                  <img className="modal__img" src={guitarImage.src} srcSet={guitarImage.srcSet} width="67" height="137" alt="Честер bass" />
                  <div className="modal__info-wrapper">
                    <h3 className="modal__product-name title title--little title--uppercase">Гитара {name}</h3>
                    <p className="modal__product-params modal__product-params--margin-11">Артикул: {vendorCode}</p>
                    <p className="modal__product-params">{guitarTypes[type as keyof (typeof guitarTypes)]}, {stringCount} струнная</p>
                    <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{guitarPrice}</span></p>
                  </div>
                </div>
                <div className="modal__button-container">
                  <button
                    onClick={onAddToCart}
                    className="button button--red button--big modal__button modal__button--add"
                  >Добавить в корзину
                  </button>
                </div>
                <button onClick={() => dispatch(toggleAddToCartModal(false))} className="modal__close-btn button-cross" type="button" aria-label="Закрыть"><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </FocusLock>
    </RemoveScroll>
  );
}

export default AddCartModal;
