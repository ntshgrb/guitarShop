import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import FocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';
import { isEscKey } from '../../utils/utils';
import { deleteProduct } from '../../store/reducers/cart';
import './cart-delete-modal.css';
import { useAppDispatch } from '../../hooks';

type CartDeleteModalProps = {
  toggle: () => void;
  itemToDelete: {
    image: {
      src: string;
      srcSet: string;
  },
    price: string,
    name: string,
    stringCount: number,
    vendorCode: string,
    itemType: string,
    id: number,
  };
}

function CartDeleteModal({ toggle, itemToDelete }: CartDeleteModalProps): JSX.Element {
  const dispatch = useAppDispatch();

  const documentKeyDownHandler = (event: KeyboardEvent) => {
    if (isEscKey(event)) {
      toggle();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', documentKeyDownHandler);
    document.querySelector('.modal__overlay')?.addEventListener('click', () => toggle());
    return () => {
      document.removeEventListener('keydown', documentKeyDownHandler);
    };
  });

  const onDeleteClick = () => dispatch(deleteProduct(itemToDelete.id));

  return (
    ReactDOM.createPortal(
      <RemoveScroll>
        <FocusLock>
          <div className="cart-delete-modal">
            <div className="modal is-active modal-for-ui-kit">
              <div className="modal__wrapper">
                <div className="modal__overlay" data-close-modal></div>
                <div className="modal__content">
                  <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
                  <div className="modal__info">
                    <img className="modal__img" src={itemToDelete.image.src} srcSet={itemToDelete.image.srcSet} width="67" height="137" alt={itemToDelete.name} />
                    <div className="modal__info-wrapper">
                      <h3 className="modal__product-name title title--little title--uppercase">{itemToDelete.name}</h3>
                      <p className="modal__product-params modal__product-params--margin-11">Артикул: {itemToDelete.vendorCode}</p>
                      <p className="modal__product-params">{itemToDelete.itemType}, {itemToDelete.stringCount} струнная</p>
                      <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{itemToDelete.price}</span></p>
                    </div>
                  </div>
                  <div className="modal__button-container">
                    <button
                      onClick={onDeleteClick}
                      className="button button--small modal__button"
                    >
                        Удалить товар
                    </button>
                    <button
                      onClick={toggle}
                      className="button button--black-border button--small modal__button modal__button--right"
                    >Продолжить покупки
                    </button>
                  </div>
                  <button
                    onClick={toggle}
                    className="modal__close-btn button-cross"
                    type="button"
                    aria-label="Закрыть"
                  >
                    <span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </FocusLock>
      </RemoveScroll>, document.body,
    ));
}

export default CartDeleteModal;
