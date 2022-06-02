import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { ratingStarSize } from '../../const';
import RatingStars from './rating-stars';

describe('component: RatingStars', () => {
  it('Should render 2 pages correctly', async () => {
    const mockStore = configureMockStore();
    render(
      <BrowserRouter >
        <Provider store={mockStore()}>
          <RatingStars ratingCount={3} starSize={ratingStarSize}/>
        </Provider>
      </BrowserRouter>,
    );

    const starsElements = await screen.findAllByTestId('testId');
    expect(starsElements).toHaveLength(5);
  });
});
