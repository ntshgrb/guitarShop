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
