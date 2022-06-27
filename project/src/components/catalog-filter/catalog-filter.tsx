import React, { memo, useEffect, useState } from 'react';
import PriceRange from '../price-range/price-range';
import { availableTypes, availableStringsCount, AppRoute, FilterParams } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setGuitarType, setStringsCount } from '../../store/reducers/catalog-filter';
import { setCurrentCatalogPage } from '../../store/reducers/guitars';
import { useNavigate, useSearchParams } from 'react-router-dom';

function CatalogFilter(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [resetPrice, setResetPrice] = useState(false);

  const [selectedTypes, setSelectedTypes ] =  useState<string[]>([]);
  const [activeStrings, setActiveStrings] = useState<number[]>([]);
  const [selectedStrings, setSelectedStrings] = useState<number[]>([]);

  const stringsCount = Array.from(new Set(availableTypes
    .reduce( (previousValue, currentValue) => [...previousValue, ...currentValue.strings], [] as number[])));
  const stringsCountOrdered = stringsCount.sort((a, b) => a - b);

  useEffect(() => {
    if (selectedTypes.length > 0) {
      const activeStringsCount = Array.from(new Set(selectedTypes
        .reduce( (previousValue, guitarType) => [...previousValue, ...availableStringsCount[guitarType as 'acoustic' | 'electric' | 'ukulele']], [] as number[])));
      setActiveStrings(activeStringsCount);
      searchParams.delete(FilterParams.Type);
      const typeParam = selectedTypes.join('_');
      searchParams.set(FilterParams.Type, typeParam);
    } else {
      searchParams.delete(FilterParams.Type);
      setActiveStrings([]);
    }

    dispatch(setGuitarType(selectedTypes));
    setSearchParams(searchParams);
    dispatch(setCurrentCatalogPage(1));
    navigate(AppRoute.CatalogMain, {state: searchParams.toString()});
  }, [dispatch, selectedTypes]);

  useEffect(() => {
    if (activeStrings.length > 0) {
      const updatedSelectedStrings: number[] = selectedStrings.reduce( (acc, item) => {
        if (activeStrings.includes(item)) {
          acc.push(item);
        }
        return acc;
      }, [] as number[]);

      setSelectedStrings(updatedSelectedStrings);
    }

  }, [activeStrings]);

  useEffect(() => {
    if (selectedStrings.length > 0) {
      searchParams.delete(FilterParams.Strings);
      const stringsParam = selectedStrings.join('_');
      searchParams.set(FilterParams.Strings, stringsParam);
    } else {
      searchParams.delete(FilterParams.Strings);
    }
    dispatch(setStringsCount(selectedStrings));
    setSearchParams(searchParams);
    dispatch(setCurrentCatalogPage(1));
    navigate(AppRoute.CatalogMain, {state: searchParams.toString()});
  }, [dispatch, selectedStrings]);

  const isDisabled = (count: number) => (selectedTypes.length > 0) ? !activeStrings.includes(count) : false;

  const onTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedTypes.includes(event.target.name)) {
      setSelectedTypes((prevValue) => [event.target.name, ...prevValue]);
    } else {
      const typeIndex = selectedTypes.indexOf(event.target.name);
      setSelectedTypes((prevValue) => [...prevValue.slice(0, typeIndex), ...prevValue.slice(typeIndex + 1)]);
    }
  };

  const onStringsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.dataset.strings && !selectedStrings.includes(+event.target.dataset.strings)) {
      setSelectedStrings((prevValue) => [Number(event.target.dataset.strings), ...prevValue]);
    } else {
      const typeIndex = selectedStrings.indexOf(Number(event.target.dataset.strings));
      setSelectedStrings((prevValue) => [...prevValue.slice(0, typeIndex), ...prevValue.slice(typeIndex + 1)]);
    }
  };

  const onResetButtonClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setSelectedTypes([]);
    setSelectedStrings([]);
    setResetPrice(true);
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>

      <PriceRange resetData={resetPrice} setResetPrice={setResetPrice}/>

      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {
          availableTypes.map( (type) => (
            <div key={type.name} className="form-checkbox catalog-filter__block-item">
              <input className="visually-hidden" type="checkbox"
                onChange={onTypeChange}
                id={type.typeName}
                name={type.typeName}
                checked={selectedTypes.includes(type.typeName)}
              />
              <label htmlFor={type.typeName}>{type.name}</label>
            </div>
          ))
        }
      </fieldset>


      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>

        {
          stringsCountOrdered.map((count) => (
            <div key={count} className="form-checkbox catalog-filter__block-item">
              <input className="visually-hidden" type="checkbox" data-strings={count}
                onChange={onStringsChange}
                id={`${count}-strings`} name={`${count}-strings`}
                disabled={(isDisabled(count))}
                checked={selectedStrings.includes(count)}
              />
              <label htmlFor={`${count}-strings`}>{count}</label>
            </div>
          ))
        }

      </fieldset>

      <button
        onClick={onResetButtonClick}
        className="catalog-filter__reset-btn button button--black-border button--medium"
        type="reset"
      >Очистить
      </button>
    </form>
  );
}

export default memo(CatalogFilter);
