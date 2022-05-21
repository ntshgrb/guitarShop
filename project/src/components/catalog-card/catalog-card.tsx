import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Guitar } from '../../types/guitar';
import { getPreviewImage, getFormattedPrice, getRatingStars } from '../../utils/card';

type CatalogCardProps = {
  guitarItem: Guitar
}

function CatalogCard({guitarItem}: CatalogCardProps): JSX.Element {
  const { previewImg, rating, name, price, id } = guitarItem;

  const guitarImage = getPreviewImage(previewImg);
  const guitarPrice = getFormattedPrice(price);
  const ratingStars = getRatingStars(rating);

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

          {
            ratingStars.map( (ratingStar) =>  (
              <svg key={ratingStar[0]} width="12" height="11" aria-hidden="true">
                <use xlinkHref={ratingStar[1]}></use>
              </svg>
            ))
          }

          <p className="visually-hidden">Рейтинг: Хорошо</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>
            9
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
          to={ `${AppRoute.GuitarPage}${id}`}
        >
          Подробнее
        </Link>
        <a className="button button--red button--mini button--add-to-cart" href="#">Купить</a>
      </div>
    </div>
  );
}

export default CatalogCard;
