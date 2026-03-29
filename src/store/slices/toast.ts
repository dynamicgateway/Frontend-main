import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { ToastSeverity } from '@/components/toast/toast';

export interface ToastState {
  type: ToastSeverity;
  message: string;
  isOpen?: boolean;
}

const initialState: ToastState = {
  type: ToastSeverity.SUCCESS,
  message: '',
  isOpen: false,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToast: (state, action: PayloadAction<ToastState>) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
      state.isOpen = true;
    },
    clearToast: (state) => {
      state.isOpen = false;
      state.message = '';
    },
  },
  selectors: {
    selectToast: (state) => state,
  },
});

export default toastSlice;
export const { setToast, clearToast } = toastSlice.actions;
export const { selectToast } = toastSlice.selectors;
