import RatingStars from '../rating-stars/rating-stars';
import { ratingStarSizeBig, Rating, REVIEWS_STEP } from '../../const';
import { getReviewDate } from '../../utils/utils';
import { getComments } from '../../store/selectors/selectors';
import { Dispatch, memo, SetStateAction, useState } from 'react';
import { useAppSelector } from '../../hooks';
import './comments.css';

type CommentsProps = {
  setModalIsVisible: Dispatch<SetStateAction<boolean>>,
}

function Comments({ setModalIsVisible }: CommentsProps): JSX.Element | null {
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

  const onUpButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <button
        onClick={() => setModalIsVisible(true)}
        className="button button--red-border button--big reviews__sumbit-button"
      >
        Оставить отзыв
      </button>

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
        onClick={onMoreReviewsClick}
        className={`button button--medium reviews__more-button ${reviewsButtonIsHidden ? 'reviews__more-button--disabled' : ''}`}
      >
          Показать еще отзывы
      </button>

      <button
        onClick={onUpButtonClick}
        className="button button--up button--red-border button--big reviews__up-button"
      >
        Наверх
      </button>
    </section>
  );
}

export default memo(Comments);
