import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NameSpace } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchGuitarDataAction } from '../../store/api-actions';
import { getPreviewImage, getFormattedPrice } from '../../utils/card';
import { ratingStarSizeBigger, guitarTypes } from '../../const';
import RatingStars from '../../components/rating-stars/rating-stars';

function GuitarPage(): JSX.Element | null {
  const pathParams = useParams();
  const dispatch = useAppDispatch();

  const { guitar } = useAppSelector((state) => state[NameSpace.guitars].currentGuitarData);

  const guitarId = pathParams.id;

  useEffect(() => {
    if (guitarId) {
      dispatch(fetchGuitarDataAction(guitarId));
    }
  }, [guitarId, dispatch]);

  if (!guitar) {
    return null;
  }

  const { previewImg, name, rating, vendorCode, type: guitarType, stringCount, price, description } = guitar;
  const guitarImage = getPreviewImage(previewImg);
  const guitarPrice = getFormattedPrice(price);

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Товар</h1>
        <ul className="breadcrumbs page-content__breadcrumbs">
          <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a>
          </li>
          <li className="breadcrumbs__item"><a className="link" href="./main.html">Каталог</a>
          </li>
          <li className="breadcrumbs__item"><a className="link">Товар</a>
          </li>
        </ul>
        <div className="product-container">

          <img
            className="product-container__img"
            src={guitarImage.src}
            srcSet={guitarImage.srcSet}
            width="90"
            height="235"
            alt={name}
          />

          <div className="product-container__info-wrapper">
            <h2 className="product-container__title title title--big title--uppercase">СURT Z30 Plus</h2>

            <div className="rate product-container__rating">

              <RatingStars
                starSize={ratingStarSizeBigger}
                ratingCount={rating}
              />

              <p className="visually-hidden">Оценка: Хорошо</p>
            </div>

            <div className="tabs">
              <a className="button button--medium tabs__button" href="#characteristics">Характеристики</a>
              <a className="button button--black-border button--medium tabs__button" href="#description">Описание</a>
              <div className="tabs__content" id="characteristics">
                <table className="tabs__table">
                  <tbody>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Артикул:</td>
                      <td className="tabs__value">
                        {vendorCode}
                      </td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Тип:</td>
                      <td className="tabs__value">
                        {guitarTypes[guitarType as keyof (typeof guitarTypes)]}
                      </td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Количество струн:</td>
                      <td className="tabs__value">{stringCount} струнная</td>
                    </tr>
                  </tbody>
                </table>
                <p className="tabs__product-description hidden">
                  {description}
                </p>
              </div>
            </div>
          </div>

          <div className="product-container__price-wrapper">
            <p className="product-container__price-info product-container__price-info--title">Цена:</p>
            <p className="product-container__price-info product-container__price-info--value">{guitarPrice}</p>
            <a className="button button--red button--big product-container__button" href="#">Добавить в корзину</a>
          </div>
        </div>
        <section className="reviews">
          <h3 className="reviews__title title title--bigger">Отзывы</h3><a className="button button--red-border button--big reviews__sumbit-button" href="#">Оставить отзыв</a>
          <div className="review">
            <div className="review__wrapper">
              <h4 className="review__title review__title--author title title--lesser">Иванов Максим</h4><span className="review__date">12 декабря</span>
            </div>
            <div className="rate review__rating-panel">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg>
              <p className="visually-hidden">Оценка: Хорошо</p>
            </div>
            <h4 className="review__title title title--lesser">Достоинства:</h4>
            <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
            <h4 className="review__title title title--lesser">Недостатки:</h4>
            <p className="review__value">Тугие колонки</p>
            <h4 className="review__title title title--lesser">Комментарий:</h4>
            <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня.</p>
          </div>
          <div className="review">
            <div className="review__wrapper">
              <h4 className="review__title review__title--author title title--lesser">Перова Ольга</h4><span className="review__date">12 декабря</span>
            </div>
            <div className="rate review__rating-panel">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg>
              <p className="visually-hidden">Оценка: Хорошо</p>
            </div>
            <h4 className="review__title title title--lesser">Достоинства:</h4>
            <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
            <h4 className="review__title title title--lesser">Недостатки:</h4>
            <p className="review__value">Тугие колонки</p>
            <h4 className="review__title title title--lesser">Комментарий:</h4>
            <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. </p>
          </div>
          <div className="review">
            <div className="review__wrapper">
              <h4 className="review__title review__title--author title title--lesser">Преображенская  Ксения</h4><span className="review__date">12 декабря</span>
            </div>
            <div className="rate review__rating-panel">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg>
              <p className="visually-hidden">Оценка: Хорошо</p>
            </div>
            <h4 className="review__title title title--lesser">Достоинства:</h4>
            <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
            <h4 className="review__title title title--lesser">Недостатки:</h4>
            <p className="review__value">Тугие колонки</p>
            <h4 className="review__title title title--lesser">Комментарий:</h4>
            <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. </p>
          </div>
          <button className="button button--medium reviews__more-button">Показать еще отзывы</button><a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>
        </section>
      </div>
    </main>
  );
}

export default GuitarPage;
