import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppRoute, FilterParams, NameSpace, RangeOfPrice } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setUserPriceRange } from '../../store/reducers/catalog-filter';
import { setCurrentCatalogPage } from '../../store/reducers/guitars';
import { isEnterKey } from '../../utils/utils';

type PriceRangeProps = {
  resetData: boolean;
  setResetPrice: React.Dispatch<React.SetStateAction<boolean>>;
}

function PriceRange({ resetData, setResetPrice }: PriceRangeProps): JSX.Element {
  const { minPrice, maxPrice } = useAppSelector((state) => state[NameSpace.catalogFilter].priceRange);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const minPriceRef = useRef<HTMLInputElement | null>(null);
  const maxPriceRef = useRef<HTMLInputElement | null>(null);

  const [ userMinPrice, setUserMinPrice ] = useState('');
  const [ userMaxPrice, setUserMaxPrice ] = useState('');

  const [ searchParams, setSearchParams ] = useSearchParams();

  useEffect(() => {
    if(searchParams.has(FilterParams.PriceStart && FilterParams.PriceEnd)) {
      const priceStart = (searchParams.get(FilterParams.PriceStart));
      const priceEnd = (searchParams.get(FilterParams.PriceEnd));

      setUserMinPrice(priceStart as string);
      setUserMaxPrice(priceEnd as string);

      dispatch(setUserPriceRange({
        userMinPrice: priceStart,
        userMaxPrice: priceEnd,
      }));
    }
    return () => {
      dispatch(setUserPriceRange({
        userMinPrice: null,
        userMaxPrice: null,
      }));
    };
  }, []);

  useEffect(() => {
    if (resetData) {
      setUserMinPrice('');
      setUserMaxPrice('');
      dispatch(setUserPriceRange({
        userMinPrice: null,
        userMaxPrice: null,
      }));
      setResetPrice(false);
    }
  }, [resetData, setResetPrice]);

  const updateSearchParams = (priceStart: number | null, priceEnd: number | null) => {
    if(priceStart || priceEnd) {
      searchParams.delete(FilterParams.PriceStart);
      searchParams.set(FilterParams.PriceStart, String(priceStart));

      searchParams.delete(FilterParams.PriceEnd);
      searchParams.set(FilterParams.PriceEnd, String(priceEnd));

      setSearchParams(searchParams);
      dispatch(setCurrentCatalogPage(1));
      navigate(AppRoute.CatalogMain, {state: searchParams.toString()});
    }
  };

  const onPriceChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
    switch (event.target.name) {
      case (RangeOfPrice.Start):
        if (+event.target.value > +userMaxPrice && userMaxPrice !== '') {
          minPriceRef.current?.setCustomValidity(`Не больше ${userMaxPrice.toLocaleString()} руб.`);
        } else if (maxPrice && +event.target.value > maxPrice) {
          minPriceRef.current?.setCustomValidity(`Не больше ${maxPrice.toLocaleString()} руб.`);
        } else if (minPrice && +event.target.value < minPrice) {
          minPriceRef.current?.setCustomValidity(`Не меньше ${minPrice.toLocaleString()} руб.`);
        } else {
          minPriceRef.current?.setCustomValidity('');
        }
        minPriceRef.current?.reportValidity();
        setUserMinPrice(event.target.value);
        break;
      case (RangeOfPrice.End):
        if (maxPrice && +event.target.value > maxPrice) {
          maxPriceRef.current?.setCustomValidity(`Не больше ${maxPrice.toLocaleString()} руб.`);
        } else if (+event.target.value < +userMinPrice) {
          maxPriceRef.current?.setCustomValidity(`Не меньше ${userMinPrice.toLocaleString()} руб.`);
        } else if (minPrice && +event.target.value < minPrice) {
          maxPriceRef.current?.setCustomValidity(`Не меньше ${minPrice.toLocaleString()} руб.`);
        } else {
          maxPriceRef.current?.setCustomValidity('');
        }
        maxPriceRef.current?.reportValidity();
        setUserMaxPrice(event.target.value);
        break;
    }
  };

  const handleMinPriceChange = () => {
    if (+userMinPrice > +userMaxPrice && userMaxPrice !== '') {
      setUserMinPrice(userMaxPrice);
      dispatch(setUserPriceRange({
        userMinPrice: userMaxPrice,
        userMaxPrice: userMaxPrice,
      }));
      updateSearchParams(+userMaxPrice, +userMaxPrice);
      return;
    }
    if (minPrice && +userMinPrice < minPrice && userMinPrice !== '') {
      setUserMinPrice(String(minPrice));
      dispatch(setUserPriceRange({
        userMinPrice: minPrice,
        userMaxPrice: userMaxPrice ? +userMaxPrice : maxPrice,
      }));
      updateSearchParams(minPrice, userMaxPrice ? +userMaxPrice : maxPrice);
      return;
    }

    if (maxPrice && +userMinPrice > maxPrice) {
      setUserMinPrice(String(maxPrice));
      dispatch(setUserPriceRange({
        userMinPrice: maxPrice,
        userMaxPrice: maxPrice,
      }));
      updateSearchParams(maxPrice, maxPrice);
      return;
    }
    if (userMinPrice === '') {
      setUserMinPrice(String(minPrice));
      dispatch(setUserPriceRange({
        userMinPrice: minPrice,
        userMaxPrice: userMaxPrice ? +userMaxPrice : maxPrice,
      }));
      updateSearchParams(minPrice, userMaxPrice ? +userMaxPrice : maxPrice);
      return;
    }

    dispatch(setUserPriceRange({
      userMinPrice: userMinPrice ? +userMinPrice : minPrice,
      userMaxPrice: userMaxPrice ? +userMaxPrice : maxPrice,
    }));
    updateSearchParams(userMinPrice ? +userMinPrice : minPrice, userMaxPrice ? +userMaxPrice : maxPrice);
  };

  const onMinPriceBlur = () => {
    handleMinPriceChange();
  };

  const onMinPriceKeyDown = (event: React.KeyboardEvent) => {
    if (isEnterKey(event)) {
      handleMinPriceChange();
    }
  };

  const handleMaxPriceChange = () => {
    if (minPrice && +userMaxPrice < minPrice && userMaxPrice !== '') {
      userMinPrice ? setUserMaxPrice(userMinPrice) : setUserMaxPrice('');
      dispatch(setUserPriceRange({
        userMinPrice: userMinPrice ? +userMinPrice : minPrice,
        userMaxPrice: userMinPrice ? +userMinPrice : maxPrice,
      }));
      updateSearchParams(userMinPrice ? +userMinPrice : minPrice, userMinPrice ? +userMinPrice : maxPrice);
      return;
    }
    if (+userMaxPrice < +userMinPrice && userMaxPrice !== '') {
      setUserMaxPrice(userMinPrice);
      dispatch(setUserPriceRange({
        userMinPrice: userMinPrice,
        userMaxPrice: userMinPrice,
      }));
      updateSearchParams(+userMinPrice, +userMinPrice);

      return;
    }
    if (maxPrice && +userMaxPrice > maxPrice) {
      setUserMaxPrice(String(maxPrice));
      dispatch(setUserPriceRange({
        userMinPrice: userMinPrice ? +userMinPrice : minPrice,
        userMaxPrice: maxPrice,
      }));
      updateSearchParams(userMinPrice ? +userMinPrice : minPrice, maxPrice);
      return;
    }
    if (userMaxPrice === '') {
      setUserMaxPrice(String(maxPrice));
      dispatch(setUserPriceRange({
        userMinPrice: userMinPrice ? +userMinPrice : minPrice,
        userMaxPrice: maxPrice,
      }));
      updateSearchParams(userMinPrice ? +userMinPrice : minPrice, maxPrice);
      return;
    }

    dispatch(setUserPriceRange({
      userMinPrice: userMinPrice ? +userMinPrice : minPrice,
      userMaxPrice: userMaxPrice ? +userMaxPrice : maxPrice,
    }));
    updateSearchParams(userMinPrice ? +userMinPrice : minPrice, userMaxPrice ? +userMaxPrice : maxPrice);
  };

  const onMaxPriceBlur = () => {
    handleMaxPriceChange();
  };

  const onMaxPriceKeyDown = (event: React.KeyboardEvent) => {
    if (isEnterKey(event)) {
      handleMaxPriceChange();
    }
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input
            onKeyDown={onMinPriceKeyDown}
            onBlur={onMinPriceBlur}
            onChange={onPriceChange}
            ref={minPriceRef}
            value={userMinPrice}
            type="number"
            placeholder={minPrice?.toLocaleString()}
            id="priceMin"
            name="от"
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            onKeyDown={onMaxPriceKeyDown}
            onBlur={onMaxPriceBlur}
            onChange={onPriceChange}
            ref={maxPriceRef}
            value={userMaxPrice}
            type="number"
            placeholder={maxPrice?.toLocaleString()}
            id="priceMax"
            name="до"
          />
        </div>
      </div>
    </fieldset>
  );
}

export default PriceRange;
