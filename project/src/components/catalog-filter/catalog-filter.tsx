import { memo, useEffect, useState } from 'react';
import PriceRange from '../price-range/price-range';
import { availableTypes, availableStringsCount } from '../../const';

function CatalogFilter(): JSX.Element {
  const [selectedTypes, setSelectedTypes ] =  useState<string[]>([]);
  const [activeStrings, setActiveStrings] = useState<number[]>([]);
  const [selectedStrings, setSelectedStrings] = useState<number[]>([]);

  const onTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedTypes.includes(event.target.name)) {
      setSelectedTypes((prevValue) => [event.target.name, ...prevValue]);
      return;
    }

    const typeIndex = selectedTypes.indexOf(event.target.name);
    setSelectedTypes((prevValue) => [...prevValue.slice(0, typeIndex), ...prevValue.slice(typeIndex + 1)]);
  };

  const stringsCount = Array.from(new Set(availableTypes
    .reduce( (previousValue, currentValue) => [...previousValue, ...currentValue.strings], [] as number[])));
  const stringsCountOrdered = stringsCount.sort((a, b) => a - b);

  useEffect(() => {
    if (selectedTypes.length > 0) {
      const activeStringsCount = Array.from(new Set(selectedTypes
        .reduce( (previousValue, guitarType) => [...previousValue, ...availableStringsCount[guitarType as 'acoustic' | 'electric' | 'ukulele']], [] as number[])));
      setActiveStrings(activeStringsCount);
    } else {
      setActiveStrings([]);
    }
  }, [selectedTypes]);

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

  const isDisabled = (count: number) => (selectedTypes.length > 0) ? !activeStrings.includes(count) : false;

  const onStringsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.dataset.strings && !selectedStrings.includes(+event.target.dataset.strings)) {
      setSelectedStrings((prevValue) => [Number(event.target.dataset.strings), ...prevValue]);
      return;
    }

    const typeIndex = selectedStrings.indexOf(Number(event.target.dataset.strings));
    setSelectedStrings((prevValue) => [...prevValue.slice(0, typeIndex), ...prevValue.slice(typeIndex + 1)]);
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <PriceRange />
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

      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>
    </form>
  );
}

export default memo(CatalogFilter);
