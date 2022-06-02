import { memo } from 'react';
import { MAX_GUITAR_RATING } from '../../const';

type RatingStarsProps = {
  ratingCount: number,
  starSize: {
    width: number,
    heigth: number,
  }
}

function RatingStars({ ratingCount, starSize }: RatingStarsProps): JSX.Element {
  const ratingStars = Array.from({length: MAX_GUITAR_RATING}, () => '#icon-star').fill('#icon-full-star', 0, Math.ceil(ratingCount));
  const ratingStarsLabels = Array.from({length: MAX_GUITAR_RATING}, (_ars, index) => [`star-${index}`]);

  ratingStars.forEach( (value, index) => ratingStarsLabels[index].push(value));

  return (
    <>
      {
        ratingStarsLabels.map( (ratingStar) =>  (
          <svg
            key={ratingStar[0]}
            width={starSize.width}
            height={starSize.heigth}
            aria-hidden="true"
            data-testid={'testId'}
          >
            <use xlinkHref={ratingStar[1]}></use>
          </svg>),
        )
      }
    </>
  );
}

export default memo(RatingStars);
