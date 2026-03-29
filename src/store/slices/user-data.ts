import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { UserDataRole, UserOnBoardingStatus } from '@/types/user-data';

export interface UserDataState {
  role: UserDataRole | null;
  userId?: string;
  userOnBoardingType: UserDataRole | null;
  userOnBoardingStatus: UserOnBoardingStatus | null;
}

const initialState: UserDataState = {
  role: null,
  userId: undefined,
  userOnBoardingType: null,
  userOnBoardingStatus: null,
};

const userDataSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserDataState>) => {
      state.role = action.payload.role;
      state.userId = action.payload.userId;
      state.userOnBoardingType = action.payload.userOnBoardingType;
      state.userOnBoardingStatus = action.payload.userOnBoardingStatus;
    },
    setUserRole: (state, action: PayloadAction<UserDataRole>) => {
      state.role = action.payload;
    },
    setUserOnBoardingType: (state, action: PayloadAction<UserDataRole>) => {
      state.userOnBoardingType = action.payload;
    },
    setUserOnBoardingStatus: (state, action: PayloadAction<UserOnBoardingStatus>) => {
      state.userOnBoardingStatus = action.payload;
    },
    clearUserRole: (state) => {
      state.role = null;
      state.userOnBoardingType = null;
      state.userOnBoardingStatus = null;
    },
    clearUserData: (state) => {
      state.role = null;
      state.userId = undefined;
      state.userOnBoardingType = null;
      state.userOnBoardingStatus = null;
    },
  },
  selectors: {
    selectUserData: (state) => state,
    selectUserRole: (state) => state.role,
    selectUserOnBoardingType: (state) => state.userOnBoardingType,
    selectUserOnBoardingStatus: (state) => state.userOnBoardingStatus,
  },
});

export default userDataSlice;
export const {
  setUserRole,
  setUserOnBoardingType,
  clearUserRole,
  clearUserData,
  setUserData,
  setUserOnBoardingStatus,
} = userDataSlice.actions;
export const { selectUserData, selectUserRole, selectUserOnBoardingType, selectUserOnBoardingStatus } =
  userDataSlice.selectors;
