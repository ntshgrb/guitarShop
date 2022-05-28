import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Guitar } from '../types/guitar';
import { UserComment } from '../types/comment';
import { CommentPost } from '../types/comment-post';
import { APIRoute } from '../const';
import { AxiosInstance } from 'axios';
import { loadGuitarsList, setLoading } from './reducers/guitars';
import { loadGuitarData, loadGuitarComments, updateComments } from './reducers/current-guitar';
import { errorHandle } from '../utils/error-handle';
import { toast } from 'react-toastify';

const toastLoading = {pending: 'Loading...'};

export const fetchGuitarsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadGuitars',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<Guitar[]>(APIRoute.GuitarsLimited);
      dispatch(loadGuitarsList(data));
    } catch (error) {
      dispatch(setLoading(false));
      errorHandle(error);
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
      const { data: guitarData } = await toast.promise((api.get<Guitar>(`${APIRoute.Guitars}/${guitarId}`)), toastLoading);
      dispatch(loadGuitarData(guitarData));
    } catch (error) {
      errorHandle(error);
    }
    try {
      const { data: userComments }  = await api.get<UserComment>(`${APIRoute.Guitars}/${guitarId}${APIRoute.Comments}`);
      dispatch(loadGuitarComments(userComments));
    } catch(error) {
      toast.info('Не удалось загрузить отзывы');
      dispatch(loadGuitarComments([]));
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
      const { data } = await api.post(APIRoute.Comments, commentData);
      dispatch(updateComments(data));
      onSuccess();
    } catch (error) {
      errorHandle(error);
    }
  },
);
