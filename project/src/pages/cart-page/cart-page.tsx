import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { BreadcrumbsNameSpace, NameSpace } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import CartListItem from '../../components/cart-list-item/cart-list-item';
import { getFormattedPrice } from '../../utils/utils';
import React, { useRef, useState } from 'react';
import { postCouponAction } from '../../store/api-actions';
import { CouponStatus } from '../../types/coupon';

function CartPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const cartList = useAppSelector((state) => state[NameSpace.cart].cartList);
  const couponDiscount = useAppSelector((state) => state[NameSpace.cart].coupon);

  const couponRef = useRef<null | HTMLInputElement>(null);
  const [ couponIsPosted, setCouponIsPosted ] = useState<null | CouponStatus>(null);

  const totalPrice = cartList.reduce((previousValue, currentItem) => previousValue + (currentItem.quantity * currentItem.product.price), 0);
  const totalPriceFormatted = getFormattedPrice(totalPrice);

  let discountValue = 0;
  if (couponDiscount) {
    discountValue = totalPrice * (couponDiscount / 100);
  }

  const totalCartPrice = totalPrice - discountValue;


  const oCouponSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if(couponRef.current?.value.includes(' ')) {
      couponRef.current.setCustomValidity('Промокод не может содержать пробелов');
    } else {
      couponRef.current?.setCustomValidity('');
    }
    couponRef.current?.reportValidity();

    if(!couponRef.current?.value.includes(' ') && couponRef.current?.value) {
      dispatch(postCouponAction({coupon: couponRef.current?.value, setCouponIsPosted: setCouponIsPosted}));
    }
  };

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="title title--bigger page-content__title">Корзина</h1>

        <Breadcrumbs name={BreadcrumbsNameSpace.CartTitle}/>

        <div className="cart">

          {
            cartList.length === 0 ?
              <p>Пока в корзине ничего нет</p> :
              cartList.map((cartListItem) => <CartListItem key={cartListItem.id} cartListItem={cartListItem} />)
          }

          <div className="cart__footer">

            <div className="cart__coupon coupon">
              <h2 className="title title--little coupon__title">Промокод на скидку</h2>
              <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
              <form
                onSubmit={oCouponSubmit}
                className="coupon__form"
                id="coupon-form" method="post"
                action="/"
              >
                <div className="form-input coupon__input">
                  <label className="visually-hidden">Промокод</label>
                  <input ref={couponRef} type="text" placeholder="Введите промокод" id="coupon" name="coupon" />
                  {
                    couponIsPosted ?
                      <p className={`form-input__message ${couponIsPosted.class}`}>{couponIsPosted.title}</p> :
                      null
                  }

                </div>
                <button className="button button--big coupon__button" type="submit">Применить</button>
              </form>
            </div>

            <div className="cart__total-info">
              <p className="cart__total-item">
                <span className="cart__total-value-name">Всего:
                </span>
                <span className="cart__total-value">{totalPriceFormatted}
                </span>
              </p>
              <p className="cart__total-item"><span className="cart__total-value-name">Скидка:</span>
                {
                  discountValue === 0 ? <span className="cart__total-value">{getFormattedPrice(discountValue)}</span> :
                    <span className="cart__total-value cart__total-value--bonus">- {getFormattedPrice(discountValue)}</span>
                }
              </p>
              <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span>
                <span className="cart__total-value cart__total-value--payment">{getFormattedPrice(totalCartPrice)}</span>
              </p>
              <button className="button button--red button--big cart__order-button">Оформить заказ</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CartPage;
