import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from 'api/axios';
import { AxiosError } from 'axios';
import { axiosErrorHandler } from 'utils/helpers';
import { API_ENDPOINTS } from 'utils/variables';
import { ITask, ITaskRequest, ITasksSet } from 'interfaces/task';

export const getTasks = createAsyncThunk<ITask[], ITask, { rejectValue: string }>(
  'tasks/getTasks',
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
  'tasks/getTasksSet',
  async (boardId: string, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(API_ENDPOINTS.TASKS_SET_BY_BOARDID(boardId));
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(axiosErrorHandler(err));
    }
  }
);

export const createTask = createAsyncThunk<ITask, ITask, { rejectValue: string }>(
  'tasks/createTask',
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
  'tasks/deleteTask',
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
  'tasks/updateTask',
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

export const updateTasksSet = createAsyncThunk(
  'tasks/updateTasksSet',
  async (dataTasksSet: ITasksSet[], { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.patch(API_ENDPOINTS.TASKS_SET, dataTasksSet);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(axiosErrorHandler(err));
    }
  }
);
