import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { getFormattedPrice, getPreviewImage } from '../../utils/utils';
import { BreadcrumbsNameSpace, guitarTypes, NameSpace } from '../../const';
import { useAppSelector } from '../../hooks';

function CartPage(): JSX.Element {
  const cartList = useAppSelector((state) => state[NameSpace.cart].cartList);

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="title title--bigger page-content__title">Корзина</h1>

        <Breadcrumbs name={BreadcrumbsNameSpace.CartTitle}/>

        <div className="cart">

          {
            cartList.map((cartListItem) => {
              const product = cartListItem.product;
              const image = getPreviewImage(product.previewImg);
              const price = getFormattedPrice(product.price);

              return (
                <div key={product.id}className="cart-item">
                  <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить">
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
                    <button className="quantity__button" aria-label="Уменьшить количество">
                      <svg width="8" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-minus"></use>
                      </svg>
                    </button>
                    <input className="quantity__input" type="number" placeholder="1" id="2-count" name="2-count" max="99" />
                    <button className="quantity__button" aria-label="Увеличить количество">
                      <svg width="8" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-plus"></use>
                      </svg>
                    </button>
                  </div>
                  <div className="cart-item__price-total">17 500 ₽</div>
                </div>
              );
            })
          }

          <div className="cart__footer">
            <div className="cart__coupon coupon">
              <h2 className="title title--little coupon__title">Промокод на скидку</h2>
              <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
              <form className="coupon__form" id="coupon-form" method="post" action="/">
                <div className="form-input coupon__input">
                  <label className="visually-hidden">Промокод</label>
                  <input type="text" placeholder="Введите промокод" id="coupon" name="coupon" />
                  <p className="form-input__message form-input__message--success">Промокод принят</p>
                </div>
                <button className="button button--big coupon__button">Применить</button>
              </form>
            </div>
            <div className="cart__total-info">
              <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">52 000 ₽</span></p>
              <p className="cart__total-item"><span className="cart__total-value-name">Скидка:</span><span className="cart__total-value cart__total-value--bonus">- 3000 ₽</span></p>
              <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">49 000 ₽</span></p>
              <button className="button button--red button--big cart__order-button">Оформить заказ</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CartPage;
