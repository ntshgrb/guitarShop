import RatingStars from '../rating-stars/rating-stars';
import { ratingStarSizeBig, Rating, REVIEWS_STEP } from '../../const';
import { getReviewDate } from '../../utils/utils';
import { getComments } from '../../store/selectors/selectors';
import { memo, useState } from 'react';
import { useAppSelector } from '../../hooks';

function Reviews(): JSX.Element | null {
  const [visibleComments, setVisibleComments] = useState(REVIEWS_STEP);
  let reviewsButtonIsHidden = false;

  const hideMoreCommentsButton = () => {
    reviewsButtonIsHidden = true;
  };

  const comments = useAppSelector(getComments(visibleComments, hideMoreCommentsButton));

  const onMoreReviewsClick = () => setVisibleComments((prevState) => prevState + REVIEWS_STEP);

  if (!comments) {
    return null;
  }

  const onUpButtonClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a className="button button--red-border button--big reviews__sumbit-button" href="#">
        Оставить отзыв
      </a>

      {
        comments.map(( comment ) => (
          <div key ={comment.id} className="review">
            <div className="review__wrapper">
              <h4 className="review__title review__title--author title title--lesser">{comment.userName}</h4>
              <span className="review__date">{getReviewDate(comment.createAt.replace('.072Z', ''))}</span>
            </div>
            <div className="rate review__rating-panel">
              <RatingStars
                ratingCount={comment.rating}
                starSize={ratingStarSizeBig}
              />
              <p className="visually-hidden">{`Оценка: ${Rating.get(comment.rating)}`}</p>
            </div>

            <h4 className="review__title title title--lesser">Достоинства:</h4>
            <p className="review__value">{comment.advantage}</p>

            <h4 className="review__title title title--lesser">Недостатки:</h4>
            <p className="review__value">{comment.disadvantage}</p>

            <h4 className="review__title title title--lesser">Комментарий:</h4>
            <p className="review__value">{comment.comment}</p>
          </div>
        ))
      }

      <button
        style={reviewsButtonIsHidden ? { pointerEvents: 'none', opacity: '0'} : undefined}
        onClick={onMoreReviewsClick}
        className="button button--medium reviews__more-button"
      >
          Показать еще отзывы
      </button>

      <a
        onClick={onUpButtonClick}
        className="button button--up button--red-border button--big reviews__up-button"
      >
        Наверх
      </a>
    </section>
  );
}

export default memo(Reviews);
