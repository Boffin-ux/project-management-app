import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from 'api/axios';
import { AxiosError } from 'axios';
import { axiosErrorHandler } from 'utils/helpers';
import { API_ENDPOINTS } from 'utils/variables';
import { IColumn, IColumnSet, IRequestForCreateColumns } from 'interfaces/columns';
import { IColumnHeaderProps, IDeleteColumn } from 'interfaces/columns';
import { ITask, ITaskRequest, ITasksSet } from 'interfaces/task';

export const getColumnsByBoardId = createAsyncThunk(
  'columns/byBoardId',
  async (boardId: string, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(API_ENDPOINTS.COLUMNS(boardId));
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
      const response = await axiosPrivate.post(API_ENDPOINTS.COLUMNS(boardId), createColumnProps);
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
  async (column: IColumn, { rejectWithValue }) => {
    try {
      const { boardId, _id } = column;
      const response = await axiosPrivate.delete(API_ENDPOINTS.COLUMN(boardId, _id));
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(axiosErrorHandler(err));
    }
  }
);

export const updateColumn = createAsyncThunk(
  'columns/update',
  async (column: IColumn, { rejectWithValue }) => {
    try {
      const { boardId, _id, title, order } = column;
      const response = await axiosPrivate.put(API_ENDPOINTS.COLUMN(boardId, _id), { title, order });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(axiosErrorHandler(err));
    }
  }
);

export const getTasks = createAsyncThunk<ITask[], ITask, { rejectValue: string }>(
  'columns/getTasks',
  async ({ boardId, columnId }: ITaskRequest, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(API_ENDPOINTS.TASKS(boardId, columnId));
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(axiosErrorHandler(err));
    }
  }
);
