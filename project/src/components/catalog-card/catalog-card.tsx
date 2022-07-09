import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, NameSpace, ratingStarSize, Rating } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchGuitarComments } from '../../store/api-actions';
import { GuitarToCartContext } from '../../store/guitar-to-cart-context';
import { toggleAddToCartModal } from '../../store/reducers/utils';
import { CartItem } from '../../types/cart-item';
import { Guitar } from '../../types/guitar';
import { getPreviewImage, getFormattedPrice } from '../../utils/utils';
import RatingStars from '../rating-stars/rating-stars';

type CatalogCardProps = {
  guitarItem: Guitar,
  cartList: CartItem[],
}

function CatalogCard({ guitarItem, cartList }: CatalogCardProps): JSX.Element {
  const { previewImg, rating, name, price, id } = guitarItem;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchGuitarComments(id));
  }, [id, dispatch]);

  let setGuitarToCart: Dispatch<SetStateAction<Guitar | null>>;
  const guitarToCart = useContext(GuitarToCartContext);

  if (guitarToCart) {
    setGuitarToCart= guitarToCart.setGuitarToCart;
  }

  const guitarsReviews = useAppSelector((state) => state[NameSpace.guitars].guitarsComments[id]);
  const guitarImage = getPreviewImage(previewImg);
  const guitarPrice = getFormattedPrice(price);

  const isInCart = cartList.some((cartListItem) => cartListItem.id === id);

  const onAddToCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(toggleAddToCartModal(true));
    setGuitarToCart(guitarItem);
  };

  const onToCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(AppRoute.Cart);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="product-card">
      <img
        src={guitarImage.src}
        srcSet={guitarImage.srcSet}
        width="75"
        height="190"
        alt={name}
      />
      <div className="product-card__info">
        <div className="rate product-card__rate">

          <RatingStars
            ratingCount={rating}
            starSize={ratingStarSize}
          />
          <p className="visually-hidden">{`Рейтинг: ${Rating.get(Math.ceil(rating))}`}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>
            {guitarsReviews ? guitarsReviews.length : null}
          </p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {guitarPrice}
        </p>
      </div>
      <div className="product-card__buttons">
        <Link
          className="button button--mini"
          to={ `${AppRoute.ProductPage}${id}`}
        >
          Подробнее
        </Link>

        {
          isInCart ?
            <button
              onClick={onToCartClick}
              className="button button--red-border button--mini button--in-cart"
            >В Корзине
            </button> :

            <button
              onClick={onAddToCartClick}
              className="button button--red button--mini button--add-to-cart"
            >
                Купить
            </button>
        }
      </div>
    </div>
  );
}

export default CatalogCard;
