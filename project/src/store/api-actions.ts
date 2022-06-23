import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Guitar } from '../types/guitar';
import { UserComment } from '../types/comment';
import { CommentPost } from '../types/comment-post';
import { APIRoute, AppRoute } from '../const';
import { AxiosInstance } from 'axios';
import { loadGuitarsList, setLoading, loadComments } from './reducers/guitars';
import { loadGuitarData, loadGuitarComments, updateComments } from './reducers/current-guitar';
import { errorHandle } from '../utils/error-handle';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { setPriceRange } from './reducers/catalog-filter';

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
      dispatch(setPriceRange(data));
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
      const navigate = useNavigate();
      navigate(AppRoute.NotFound);
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

export const fetchGuitarComments = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadGuitarComments',
  async (guitarId, {dispatch, extra: api}) => {
    try {
      const { data: userComments }  = await api.get<UserComment>(`${APIRoute.Guitars}/${guitarId}${APIRoute.Comments}`);
      dispatch(loadComments({ guitarId, userComments }));
    } catch(error) {
      dispatch(loadComments({}));
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
