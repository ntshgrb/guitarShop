import { memo, useEffect, useRef, useState } from 'react';
import { guitarTypes } from '../../const';
import { useAppDispatch } from '../../hooks';
import { decrementQuantity, incrementQuantity, changeQuantity } from '../../store/reducers/cart';
import { CartItem } from '../../types/cart-item';
import { getFormattedPrice, getPreviewImage } from '../../utils/utils';

type CartItemProps = {
  cartListItem: CartItem,
}

function CartListItem({ cartListItem }: CartItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const product = cartListItem.product;
  const image = getPreviewImage(product.previewImg);
  const price = getFormattedPrice(product.price);
  const quantityRef = useRef<null | HTMLInputElement>(null);

  const [ itemQuantity, setItemQuantity ] = useState(cartListItem.quantity);

  useEffect(() => setItemQuantity(cartListItem.quantity), [cartListItem.quantity]);

  const onDecrementClick = () => {
    dispatch(decrementQuantity(cartListItem));
  };

  const onIncrementClick = () => {
    dispatch(incrementQuantity(cartListItem));
  };

  const onQuatityBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userQuantity = +event.target.value;
    if(userQuantity > 1 && userQuantity < 99) {
      dispatch(changeQuantity({
        userQuantity,
        cartListItem,
      }));
      return;
    }

    setItemQuantity(cartListItem.quantity);
  };

  const onQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemQuantity(+event.target.value);

    if(+event.target.value > 99 && quantityRef.current) {
      quantityRef.current.setCustomValidity('Не больше 99');
    }
    if(+event.target.value < 0 && quantityRef.current) {
      quantityRef.current.setCustomValidity('Не может быть отрицательным числом');
    } else {
      quantityRef.current?.setCustomValidity('');
    }
    quantityRef.current?.reportValidity();
  };

  // eslint-disable-next-line no-console
  const onDeleteClick = () => console.log('hi');

  return (
    <div key={product.id}className="cart-item">
      <button
        onClick={onDeleteClick}
        className="cart-item__close-button button-cross"
        type="button"
        aria-label="Удалить"
      >
        <span className="button-cross__icon"></span>
        <span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image">
        <img src={image.src} srcSet={image.srcSet} width="55" height="130" alt={product.name} />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{product.name}</p>
        <p className="product-info__info">Артикул: {product.vendorCode}</p>
        <p className="product-info__info">{guitarTypes[product.type as keyof (typeof guitarTypes)]}, {product.stringCount} струнная</p>
      </div>
      <div className="cart-item__price">{price}</div>

      <div className="quantity cart-item__quantity">
        <button
          onClick={onDecrementClick}
          className="quantity__button"
          aria-label="Уменьшить количество"
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>

        <input
          onBlur={onQuatityBlur}
          onChange={onQuantityChange}
          value={itemQuantity}
          ref={quantityRef}
          className="quantity__input"
          type="number"
          id="2-count" name="2-count"
          max="99"
        />

        <button
          onClick={onIncrementClick}
          className="quantity__button"
          aria-label="Увеличить количество"
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>

      <div className="cart-item__price-total">17 500 ₽</div>
    </div>
  );
}

export default memo(CartListItem);
