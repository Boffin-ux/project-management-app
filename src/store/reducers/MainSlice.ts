import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  selectedLang: string;
}

const initialState: IState = {
  selectedLang: localStorage.getItem('i18nextLng') || '',
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setSelectedLang(state, action: PayloadAction<string>) {
      state.selectedLang = action.payload;
    },
  },
});

export const { setSelectedLang } = mainSlice.actions;
export default mainSlice.reducer;
