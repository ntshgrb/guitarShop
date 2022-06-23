import { Guitar } from '../types/guitar';

export const getPriceRange = (guitarsList: Guitar[]) => {
  const pricesList = guitarsList.map((guitar) => guitar.price);
  const minPrice = Math.min.apply(null, pricesList);
  const maxPrice = Math.max.apply(null, pricesList);

  return({
    minPrice,
    maxPrice,
  });
};
