import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Guitar } from '../types/guitar';
import { UserComment } from '../types/comment';
import { CommentPost } from '../types/comment-post';
import { APIRoute } from '../const';
import { AxiosInstance } from 'axios';
import { loadGuitarData, loadGuitarsList, updateComments } from './reducers/guitars';

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

export const fetchGuitarDataAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadGuitarData',
  async (guitarId, {dispatch, extra: api}) => {
    try {
      const [ {data: guitarData}, {data: userComments} ]  = await Promise.all([
        api.get<Guitar>(`https://guitar-shop.accelerator.pages.academy/guitars/${guitarId}`),
        api.get<UserComment>(`https://guitar-shop.accelerator.pages.academy/guitars/${guitarId}/comments`),
      ]);
      dispatch(loadGuitarData({guitarData, userComments}));
    } catch (error){
      // eslint-disable-next-line no-console
      console.log(error);
    }
  },
);

export const postUserComment = createAsyncThunk<void, CommentPost, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'comments/postUserComment',
  async ({ commentData, onSuccess }, {dispatch, extra: api}) => {
    try {
      const { data } = await api.post(`https://guitar-shop.accelerator.pages.academy${APIRoute.Comments}`, commentData);
      dispatch(updateComments(data));
      onSuccess();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  },
);
