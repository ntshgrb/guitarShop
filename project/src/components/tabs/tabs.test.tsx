import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import Tabs from './tabs';
import { fakeGuitarData } from '../../utils/mocks';


const mockStore = configureMockStore();

describe('Component: Tabs', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter >
        <Provider store={mockStore()}>
          <Tabs
            vendorCode={fakeGuitarData.vendorCode}
            guitarType={fakeGuitarData.type}
            stringCount={fakeGuitarData.stringCount}
            description={fakeGuitarData.description}
          />
        </Provider>
      </BrowserRouter>,
    );

    const vendorCodeElement = screen.getByText(fakeGuitarData.vendorCode);
    const guitarTypeElement = screen.getByText(fakeGuitarData.description);
    const charElement = screen.getByText('Характеристики');
    const descriptionElement = screen.getByText('Описание');

    expect(vendorCodeElement).toBeInTheDocument();
    expect(guitarTypeElement).toBeInTheDocument();
    expect(charElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });
});
