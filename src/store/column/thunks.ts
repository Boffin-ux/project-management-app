import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from 'api/axios';
import { AxiosError } from 'axios';
import { axiosErrorHandler } from 'utils/helpers';
import { API_ENDPOINTS } from 'utils/variables';
import { IColumnSet, IRequestForCreateColumns } from 'interfaces/columns';
import { ColumnHeaderProps } from 'components/column/Header/ColumnHeader';
import { ITask, ITaskRequest } from 'interfaces/task';

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
  async (column: ColumnHeaderProps, { rejectWithValue }) => {
    try {
      const { boardId, columnId } = column;
      const response = await axiosPrivate.delete(API_ENDPOINTS.COLUMN(boardId, columnId));
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

export const getTasksSet = createAsyncThunk<ITask[], string, { rejectValue: string }>(
  'columns/getTasksSet',
  async (boardId: string, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(API_ENDPOINTS.TASKS_SET(boardId));
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(axiosErrorHandler(err));
    }
  }
);

export const createTask = createAsyncThunk<ITask, ITask, { rejectValue: string }>(
  'columns/createTask',
  async (createdTask: ITask, { rejectWithValue }) => {
    try {
      const { _id, boardId, columnId, ...task } = createdTask;
      const response = await axiosPrivate.post(API_ENDPOINTS.TASKS(boardId, columnId), task);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(axiosErrorHandler(err));
    }
  }
);

export const deleteTask = createAsyncThunk(
  'columns/deleteTask',
  async (taskRequest: ITaskRequest, { rejectWithValue }) => {
    try {
      const { boardId, columnId, taskId } = taskRequest;
      const response = await axiosPrivate.delete(
        API_ENDPOINTS.TASK(boardId, columnId, taskId as string)
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(axiosErrorHandler(err));
    }
  }
);

export const updateTask = createAsyncThunk(
  'columns/updateTask',
  async (newTaskData: ITask, { rejectWithValue }) => {
    try {
      const { boardId, columnId, _id, ...taskBody } = newTaskData;
      const response = await axiosPrivate.put(API_ENDPOINTS.TASK(boardId, columnId, _id), {
        ...taskBody,
        columnId,
      });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(axiosErrorHandler(err));
    }
  }
);
