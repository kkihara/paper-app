// @flow

import {
  REQUEST_NEW_PAGE,
  RECEIVE_NEW_PAGE,
  REQUEST_DELETE_PAGE,
  RECEIVE_DELETE_PAGE,
  REQUEST_PUT_TITLE,
  RECEIVE_PUT_TITLE,
  REQUEST_PUT_PAGETYPE,
  RECEIVE_PUT_PAGETYPE,
  REQUEST_FETCH_ALL_PAGES,
  RECEIVE_FETCH_ALL_PAGES,
  REQUEST_FETCH_PAGE,
  RECEIVE_FETCH_PAGE,
  SEARCH_PAGE,
  APPEND_SEARCH,
} from './';
import { fetchTagsByPage } from '../actions/tag';
import { pageTypes } from '../types';
import type { T_Page, T_PageTypes, T_CurrentPage } from '../types';
import * as db from '../utils/db';

const requestNewPage = () => ({
  type: REQUEST_NEW_PAGE,
});

const receiveNewPage = (page: T_Page) => ({
  type: RECEIVE_NEW_PAGE,
  page,
});

export const newPage = (title: string = '<Untitled>') => (
  (dispatch: any) => {
    dispatch(requestNewPage());
    return db.insertPage(
      pageTypes.none,
      Date.now(),
      title,
      page => dispatch(receiveNewPage(page)),
    );
  }
);

const requestDeletePage = () => ({
  type: REQUEST_DELETE_PAGE,
});

const receiveDeletePage = (id: number) => ({
  type: RECEIVE_DELETE_PAGE,
  id,
});

export const deletePage = (id: number) => (
  (dispatch: any) => {
    dispatch(requestDeletePage());
    db.deletePage(
      id,
      () => dispatch(receiveDeletePage(id)),
    );
  }
);

const requestPutTitle = () => ({
  type: REQUEST_PUT_TITLE,
});

const receivePutTitle = (id: number, title: string) => ({
  type: RECEIVE_PUT_TITLE,
  id,
  title,
});

export const putTitle = (id: number, title: string) => (
  (dispatch: any) => {
    dispatch(requestPutTitle());
    db.updateTitle(
      id,
      title,
      () => dispatch(receivePutTitle(id, title)),
    );
  }
);

const requestPutPageType = () => ({
  type: REQUEST_PUT_PAGETYPE,
});

const receivePutPageType = (id: number, pageType: T_PageTypes) => ({
  type: RECEIVE_PUT_PAGETYPE,
  id,
  pageType,
});

export const putPageType = (id: number, pageType: T_PageTypes) => (
  (dispatch: any) => {
    // TODO: error check current pageType is none
    dispatch(requestPutPageType());
    db.updatePageType(
      id,
      pageType,
      () => dispatch(receivePutPageType(id, pageType)),
    );
  }
);

const requestFetchAllPages = () => ({
  type: REQUEST_FETCH_ALL_PAGES,
});

const receiveFetchAllPages = (pageList: Array<T_Page>) => ({
  type: RECEIVE_FETCH_ALL_PAGES,
  pageList: pageList,
});

export const fetchAllPages = () => (
  (dispatch: any) => {
    dispatch(requestFetchAllPages());
    db.getAllPages(
      pageList => dispatch(receiveFetchAllPages(pageList))
    );
  }
);

const requestFetchPage = (id: number) => ({
  type: REQUEST_FETCH_PAGE,
  id,
});

const receiveFetchPage = (page: T_CurrentPage) => ({
  type: RECEIVE_FETCH_PAGE,
  ...page,
});

export const fetchPage = (id: number) => (
  (dispatch: any) => {
    dispatch(requestFetchPage(id));
    db.loadPageById(
      id,
      page => {
        dispatch(fetchTagsByPage(id));
        dispatch(receiveFetchPage(page));
      },
    );
  }
);

export const searchPages = (query: string) => ({
  type: SEARCH_PAGE,
  query
});

export const appendToSearch = (query: string) => ({
  type: APPEND_SEARCH,
  query
});
