import { useState } from 'react';
import { guitarTypes } from '../../const';

type TabsProps = {
  vendorCode: string,
  guitarType: string,
  stringCount: number,
  description: string,
}

function Tabs({ vendorCode, guitarType, stringCount, description }: TabsProps): JSX.Element {
  enum tabsTypes {
    Characteristics = 'characteristics',
    Description = 'description',
  }

  const [ characteristicsTabIsActive, changeCharacteristicsTab ] = useState(true);
  const [ descriptionTabIsActive, changeDescriptionTab ] = useState(false);

  const onTabClick = (event: React.SyntheticEvent<HTMLAnchorElement>) => {
    if(event.currentTarget.dataset.tabType) {
      switch (event.currentTarget.dataset.tabType) {
        case tabsTypes.Characteristics:
          changeCharacteristicsTab(true);
          changeDescriptionTab(false);
          break;
        case tabsTypes.Description:
          changeCharacteristicsTab(false);
          changeDescriptionTab(true);
          break;
      }
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
      <div className="tabs__content" id="characteristics">
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
