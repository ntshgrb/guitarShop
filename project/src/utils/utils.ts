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

export const getReviewDate = (date: string) => new Date(date).toLocaleString('ru', {day: 'numeric', month: 'long'});

export const isEscKey = (event: KeyboardEvent) => event.key === 'Escape' || event.key === 'Esc' || event.code === '27';

export const isEnterKey = (event: React.KeyboardEvent) => event.key === 'Enter' || event.code === '13';
