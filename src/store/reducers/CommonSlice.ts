import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  isOpen: boolean;
}

const initialState: IState = {
  isOpen: true,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { closeModal } = commonSlice.actions;
export default commonSlice.reducer;
