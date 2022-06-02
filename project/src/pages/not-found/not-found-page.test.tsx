import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import NotFoundPage from './not-found-page';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push('/notfound');

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStore()}>
        <HistoryRouter history={history}>
          <NotFoundPage />
        </HistoryRouter>,
      </Provider>,
    );

    const headerElement = screen.getByText('Страница не найдена.');
    const buttonElement = screen.getByText('Вернуться на главную');

    expect(headerElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });
});
