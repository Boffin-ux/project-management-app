import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from 'api/axios';
import { AxiosError } from 'axios';
import { axiosErrorHandler } from 'utils/helpers';
import { API_ENDPOINTS } from 'utils/variables';
import { IRequestForCreateColumns } from 'interfaces/columns';

export const getColumnsByBoardId = createAsyncThunk(
  'columns/byBoardId',
  async (boardId: string, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(
        `${API_ENDPOINTS.BOARDS}\\${boardId}\\${API_ENDPOINTS.COLUMNS}`
      );
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
      const { borderId, ...createColumnProps } = dataColumnCreator;
      const response = await axiosPrivate.post(
        API_ENDPOINTS.BOARDS + '/' + borderId + '/' + API_ENDPOINTS.COLUMNS,
        createColumnProps
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(axiosErrorHandler(err));
    }
  }
);

// export const deleteBoard = createAsyncThunk(
//   'boards/delete',
//   async (boardId: string, { rejectWithValue }) => {
//     try {
//       const response = await axiosPrivate.delete(`${API_ENDPOINTS.BOARDS}\\${boardId}`);
//       return response.data;
//     } catch (error) {
//       const err = error as AxiosError;
//       return rejectWithValue(axiosErrorHandler(err));
//     }
//   }
// );

// export const boardsGetAll = createAsyncThunk('boards/all', async (_, { rejectWithValue }) => {
//   try {
//     const response = await axiosPrivate.get(API_ENDPOINTS.BOARDS);
//     return response.data;
//   } catch (error) {
//     const err = error as AxiosError;
//     return rejectWithValue(axiosErrorHandler(err));
//   }
// });

// export const updateBoard = createAsyncThunk(
//   'boards/update',
//   async (dataBoardUpdater: IBoard, { rejectWithValue }) => {
//     try {
//       const { _id, ...requestPayload } = dataBoardUpdater;
//       const response = await axiosPrivate.put(`${API_ENDPOINTS.BOARDS}\\${_id}`, requestPayload);
//       return response.data;
//     } catch (error) {
//       const err = error as AxiosError;
//       return rejectWithValue(axiosErrorHandler(err));
//     }
//   }
// );

// export const boardGetAllForUser = createAsyncThunk(
//   'boards/getAllForUser',
//   async (userId: string, { rejectWithValue }) => {
//     try {
//       const response = await axiosPrivate.get(`${API_ENDPOINTS.BOARDS_SET}\${userId}`);
//       return response.data;
//     } catch (error) {
//       const err = error as AxiosError;
//       return rejectWithValue(axiosErrorHandler(err));
//     }
//   }
// );

// // имеется на backend, пока не знаю где использовать
// export const boardGetById = createAsyncThunk(
//   'boards/getById',
//   async (boardId: string, { rejectWithValue }) => {
//     try {
//       const response = await axiosPrivate.get(`${API_ENDPOINTS.BOARDS}\${boardId}`);
//       return response.data;
//     } catch (error) {
//       const err = error as AxiosError;
//       return rejectWithValue(axiosErrorHandler(err));
//     }
//   }
// );

// // имеется на backend, пока не знаю где использовать
// export const boardGetByIds = createAsyncThunk(
//   'boards/getByIds',
//   async (boardIds: Array<string>, { rejectWithValue }) => {
//     try {
//       const response = await axiosPrivate.get(
//         `${API_ENDPOINTS.BOARDS_SET}?ids=${boardIds.join(',')}`
//       );
//       return response.data;
//     } catch (error) {
//       const err = error as AxiosError;
//       return rejectWithValue(axiosErrorHandler(err));
//     }
//   }
// );
