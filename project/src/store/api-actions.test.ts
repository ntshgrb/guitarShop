import { Action } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { State } from '../types/state';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { APIRoute } from '../const';
import { fetchGuitarComments, fetchGuitarDataAction, fetchGuitarsAction, postUserComment } from './api-actions';
import { makeFakeGuitar, makeFakeComment, createCommentPost } from '../utils/mocks';
import { loadComments, loadGuitarsList } from './reducers/guitars';
import { loadGuitarComments, loadGuitarData, updateComments } from './reducers/current-guitar';

const fakeGuitarsList = new Array(10).fill(null).map(() => makeFakeGuitar());
const fakeGuitarComments = new Array(3).fill(null).map(() => makeFakeComment());
const fakeGuitar = makeFakeGuitar();
const fakeComment = makeFakeComment();
const fakePostComment = createCommentPost();

describe('Async action', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch loadGuitarsList when GET data/loadGuitars', async () => {
    mockAPI
      .onGet(APIRoute.GuitarsLimited)
      .reply(200, fakeGuitarsList);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchGuitarsAction());
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toContain(loadGuitarsList.toString());
  });

  it('should dipatch loadGuitarData and loadGuitarComments when GET data/loadGuitarData', async () => {
    mockAPI
      .onGet(`${APIRoute.Guitars}/${fakeGuitar.id}`)
      .reply(200, fakeGuitar);

    mockAPI
      .onGet(`${APIRoute.Guitars}/${fakeGuitar.id}${APIRoute.Comments}`)
      .reply(200, fakeGuitarComments);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchGuitarDataAction(`${fakeGuitar.id}`));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toContain(loadGuitarData.toString());
    expect(actions).toContain(loadGuitarComments.toString());
  });

  it('should dipatch loadComments when GET data/loadGuitarComments', async () => {
    mockAPI
      .onGet(`${APIRoute.Guitars}/${fakeGuitar.id}${APIRoute.Comments}`)
      .reply(200, fakeGuitarComments);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchGuitarComments(fakeGuitar.id));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toContain(loadComments.toString());
  });

  it('should dipatch updateComments when POST comments/postUserComment', async () => {
    mockAPI
      .onPost(APIRoute.Comments)
      .reply(200, fakeComment);

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(postUserComment(fakePostComment));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toContain(updateComments.toString());
  });
});
