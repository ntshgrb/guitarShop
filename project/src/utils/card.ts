export const getPreviewImage = (initialPath: string) => {
  const imageId = /\d+/.exec(initialPath);

  return {
    src: `../img/content/catalog-product-${imageId}.jpg`,
    srcSet: `../img/content/catalog-product-${imageId}@2x.jpg 2x`,
  };
};

export const getFormattedPrice = (initialPrice: number) => (
  initialPrice.toLocaleString('ru',
    { style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }));

export const getRatingStars = (ratingCount: number) => {
  const ratingStars = Array.from({length: 5}, () => '#icon-star').fill('#icon-full-star', 0, ratingCount);
  const ratingStarsLabels = Array.from({length: 5}, (_ars, index) => [`star-${index}`]);

  ratingStars.forEach( (value, index) => ratingStarsLabels[index].push(value));

  return ratingStarsLabels;
};
