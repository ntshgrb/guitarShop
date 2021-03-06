import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { selectSearchData } from '../../store/selectors/search-selector';
import { isEnterKey } from '../../utils/utils';
import './search-line.css';

function SearchLine(): JSX.Element {
  const navigate = useNavigate();
  const [ searchValue, setSearchValue ] = useState<string>('');
  const [ searchIsActive, setSearchActive ] = useState(false);
  const searchRef = useRef<HTMLInputElement| null>(null);
  const searchElementRef = useRef<HTMLDivElement | null>(null);

  const searchResults = useAppSelector(selectSearchData(searchValue));

  const handleDocumentClick = (event: MouseEvent) => {
    if(searchElementRef.current && event.target && !searchElementRef.current.contains(event.target as Node)) {
      setSearchActive(false);
    }
  };

  useEffect(() => {
    if (searchIsActive) {
      document.addEventListener('click', handleDocumentClick);
      return;
    }
    document.removeEventListener('click', handleDocumentClick);
  }, [searchIsActive]);

  const onInputFocus = () => {
    setSearchActive(true);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.value.length) {
      case 0:
        setSearchActive(false);
        setSearchValue('');
        break;
      default:
        setSearchActive(true);
        setSearchValue(event.target.value);
        break;
    }
  };

  const onSearchItemClick = (id: number) => {
    setSearchActive(false);
    setSearchValue('');
    navigate( `${AppRoute.ProductPage}${id}`);
  };

  const onResetButtonClick = () => {
    setSearchActive(false);
    setSearchValue('');
    searchRef.current && searchRef.current.focus();
  };

  const onResultKeyDown = (event: React.KeyboardEvent, id: number) => {
    if (isEnterKey(event)) {
      setSearchActive(false);
      setSearchValue('');
      navigate( `${AppRoute.ProductPage}${id}`);
    }
  };

  const onFormSubmit = (event: React.FormEvent) => event.preventDefault();

  return (
    <div ref={searchElementRef} className="form-search">
      <form onSubmit={onFormSubmit} className="form-search__form" id="form-search">
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg><span className="visually-hidden">???????????? ??????????</span>
        </button>
        <input
          value={searchValue}
          onChange={onInputChange}
          onFocus={onInputFocus}
          ref={searchRef}
          className="form-search__input"
          id="search"
          type="text"
          autoComplete="off"
          placeholder="?????? ???? ???????????"
        />
        <label className="visually-hidden" htmlFor="search">??????????</label>
      </form>
      <ul className={searchIsActive &&  searchResults.length > 0 ? 'form-search__select-list' : 'form-search__select-list hidden'}>
        {
          (searchResults && searchValue && searchValue.length > 0) ?
            searchResults
              .map((result) => (
                <li
                  key={`${result.id}${result.name}`}
                  onClick={() => onSearchItemClick(result.id)}
                  onKeyDown={(event) => onResultKeyDown(event, result.id)}
                  className="form-search__select-item"
                  data-index={result.id}
                  tabIndex={0}
                >{result.name}
                </li>)) :
            null
        }
      </ul>
      <button
        onClick={onResetButtonClick}
        className={searchIsActive ? 'form-search__reset form-search__reset--active' : 'form-search__reset'}
        type="reset" form="form-search"
      >
        <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className='visually-hidden'>???????????????? ??????????</span>
      </button>
    </div>
  );
}

export default SearchLine;

