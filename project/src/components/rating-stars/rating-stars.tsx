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

  const guitarRating = ratingStars.map((value, index) => ({
    ratingKey: `star-${index}`,
    ratingIcon: value,
  }));

  return (
    <>
      {
        guitarRating.map( (ratingStar) =>  (
          <svg
            key={ratingStar.ratingKey}
            width={starSize.width}
            height={starSize.heigth}
            aria-hidden="true"
            data-testid={'testId'}
          >
            <use xlinkHref={ratingStar.ratingIcon}></use>
          </svg>),
        )
      }
    </>
  );
}

export default memo(RatingStars);
