import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from 'api/axios';
import { AxiosError } from 'axios';
import { axiosErrorHandler } from 'utils/helpers';
import { API_ENDPOINTS } from 'utils/variables';
import { IColumnSet, IRequestForCreateColumns } from 'interfaces/columns';
import { ColumnHeaderProps } from 'components/column/Header/ColumnHeader';
import { URLColumnDelete, URLColumnPost, URLColumnsGet } from 'utils/urlCreator';

export const getColumnsByBoardId = createAsyncThunk(
  'columns/byBoardId',
  async (boardId: string, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(URLColumnsGet(boardId));
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(axiosErrorHandler(err));
    }
  }
);

export const createColumn = createAsyncThunk(
  'columns/create',
  async (dataColumnCreator: IRequestForCreateColumns, { rejectWithValue }) => {
    try {
      const { boardId, ...createColumnProps } = dataColumnCreator;
      const response = await axiosPrivate.post(URLColumnPost(boardId), createColumnProps);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(axiosErrorHandler(err));
    }
  }
);

export const updateColumnsSet = createAsyncThunk(
  'columns/columnsSet',
  async (dataColumnSet: IColumnSet[], { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.patch(API_ENDPOINTS.COLUMNS_SET, dataColumnSet);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(axiosErrorHandler(err));
    }
  }
);

export const deleteColumn = createAsyncThunk(
  'columns/delete',
  async (column: ColumnHeaderProps, { rejectWithValue }) => {
    try {
      const { boardId, columnId } = column;
      const response = await axiosPrivate.delete(URLColumnDelete(boardId, columnId));
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(axiosErrorHandler(err));
    }
  }
);
