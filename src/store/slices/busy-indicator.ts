import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const BUSY_INDICATOR_SLICE = 'busy_indicator_slice';

const initialState: { enqueued: number } = {
  enqueued: 0,
};

/*-----SLICES-----*/
const busyIndicatorSlice = createSlice({
  name: BUSY_INDICATOR_SLICE,
  initialState,
  reducers: {
    toggleBusyIndicator: (state, { payload }: PayloadAction<boolean>) => ({
      ...state,
      enqueued: payload ? state.enqueued + 1 : state.enqueued > 0 ? state.enqueued - 1 : 0,
    }),
  },
  selectors: {
    selectBusyIndicator: (state) => state.enqueued,
  },
});

export default busyIndicatorSlice;

export const { toggleBusyIndicator } = busyIndicatorSlice.actions;
export const { selectBusyIndicator } = busyIndicatorSlice.selectors;
