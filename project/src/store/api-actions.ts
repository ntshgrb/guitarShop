import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Guitar } from '../types/guitar';
import { APIRoute } from '../const';
import { AxiosInstance } from 'axios';
import { loadGuitarsList } from './reducers/guitars';

export const fetchGuitarsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadGuitars',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<Guitar[]>(APIRoute.Guitars);
      dispatch(loadGuitarsList(data));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  },
);
