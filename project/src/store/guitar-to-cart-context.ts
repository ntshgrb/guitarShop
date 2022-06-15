import { createContext } from 'react';
import { Guitar } from '../types/guitar';

export const GuitarToCartContext = createContext<{
  guitarToCart: Guitar | null;
  setGuitarToCart: React.Dispatch<React.SetStateAction<Guitar | null>>;
} | null>(null);
