import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { guitarTypes, tabsTypes } from '../../const';

type TabsProps = {
  vendorCode: string,
  guitarType: string,
  stringCount: number,
  description: string,
}

function Tabs({ vendorCode, guitarType, stringCount, description }: TabsProps): JSX.Element {
  const location = useLocation();
  const [ characteristicsTabIsActive, changeCharacteristicsTab ] = useState(true);
  const [ descriptionTabIsActive, changeDescriptionTab ] = useState(false);

  const toggleActiveTab = (value: string) => {
    switch (value) {
      case tabsTypes.Characteristics:
        changeCharacteristicsTab(true);
        changeDescriptionTab(false);
        break;
      case tabsTypes.Description:
        changeCharacteristicsTab(false);
        changeDescriptionTab(true);
        break;
    }
  };

  useEffect(() => {
    if (location.hash) {
      const activeTab = location.hash.slice(1);
      toggleActiveTab(activeTab);
    }
  }, []);


  const onTabClick = (event: React.SyntheticEvent<HTMLAnchorElement>) => {
    if(event.currentTarget.dataset.tabType) {
      toggleActiveTab(event.currentTarget.dataset.tabType);
    }
  };

  return (
    <div className="tabs">
      <a
        onClick={onTabClick}
        data-tab-type="characteristics"
        className={`button ${characteristicsTabIsActive ? '' : 'button--black-border'} button--medium tabs__button`}
        href="#characteristics"
      >
        Характеристики
      </a>
      <a
        onClick={onTabClick}
        data-tab-type="description"
        className={`button ${descriptionTabIsActive ? '' : 'button--black-border'} button--medium tabs__button`}
        href="#description"
      >
        Описание
      </a>
      <div className="tabs__content">
        <table className="tabs__table" hidden={!characteristicsTabIsActive}>
          <tbody>
            <tr className="tabs__table-row">
              <td className="tabs__title">Артикул:</td>
              <td className="tabs__value">
                {vendorCode}
              </td>
            </tr>
            <tr className="tabs__table-row">
              <td className="tabs__title">Тип:</td>
              <td className="tabs__value">
                {guitarTypes[guitarType as keyof (typeof guitarTypes)]}
              </td>
            </tr>
            <tr className="tabs__table-row">
              <td className="tabs__title">Количество струн:</td>
              <td className="tabs__value">{stringCount} струнная</td>
            </tr>
          </tbody>
        </table>
        <p className="tabs__product-description" hidden={!descriptionTabIsActive}>
          {description}
        </p>
      </div>
    </div>
  );
}

export default Tabs;
