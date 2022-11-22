import { createSlice } from '@reduxjs/toolkit';

interface IState {
  isModalOpen: boolean;
}

const initialState: IState = {
  isModalOpen: false,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
  },
});

export const { openModal, closeModal } = commonSlice.actions;
export default commonSlice.reducer;
