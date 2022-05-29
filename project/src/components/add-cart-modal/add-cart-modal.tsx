import FocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';
import { guitarTypes } from '../../const';
import { getFormattedPrice } from '../../utils/utils';

type AddCartModalProps = {
    name: string,
    vendorCode: string,
    type: string,
    stringCount: number,
    price: number,
}

function AddCartModal({ name, vendorCode, type, stringCount, price}: AddCartModalProps): JSX.Element {
  const guitarPrice = getFormattedPrice(price);

  return (
    <RemoveScroll>
      <FocusLock>
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal></div>
          <div className="modal__content">
            <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
            <div className="modal__info">
              <img className="modal__img" src="img/content/catalog-product-2.png" srcSet="img/content/catalog-product-2@2x.png 2x" width="67" height="137" alt="Честер bass" />
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">Гитара {name}</h3>
                <p className="modal__product-params modal__product-params--margin-11">Артикул: {vendorCode}</p>
                <p className="modal__product-params">{guitarTypes[type as keyof (typeof guitarTypes)]}, {stringCount} струнная</p>
                <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{guitarPrice}</span></p>
              </div>
            </div>
            <div className="modal__button-container">
              <button className="button button--red button--big modal__button modal__button--add">Добавить в корзину</button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть"><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </FocusLock>
    </RemoveScroll>
  );
}

export default AddCartModal;
