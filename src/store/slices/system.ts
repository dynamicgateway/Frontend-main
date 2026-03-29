import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const SYSTEM_SLICE = 'system_slice';

export enum PageDirection {
  LTR = 'ltr',
  RTL = 'rtl',
}

export enum AppLanguage {
  EN = 'en',
  HE = 'he',
}

interface SystemSlice {
  isMobile: boolean | null;
  navDrawerOpen: boolean;
  direction: PageDirection;
  language: AppLanguage;
}

const initialState: SystemSlice = {
  isMobile: null,
  navDrawerOpen: false,
  direction: PageDirection.RTL,
  language: AppLanguage.HE,
};

/*-----SLICES-----*/
const systemSlice = createSlice({
  name: SYSTEM_SLICE,
  initialState,
  reducers: {
    setIsMobile: (state, { payload }: PayloadAction<SystemSlice['isMobile']>) => ({
      ...state,
      isMobile: payload,
    }),
    toggleNavDrawer: (state, { payload }: PayloadAction<SystemSlice['navDrawerOpen']>) => ({
      ...state,
      navDrawerOpen: payload,
    }),
    setDirection: (state, { payload }: PayloadAction<PageDirection>) => ({
      ...state,
      direction: payload,
    }),
    setLanguage: (state, { payload }: PayloadAction<AppLanguage>) => ({
      ...state,
      language: payload,
    }),
    resetSystemSlice: () => initialState,
  },
  selectors: {
    selectIsMobile: (state) => state.isMobile,
    selectNavDrawerOpen: (state) => state.navDrawerOpen,
    selectDirection: (state) => state.direction,
    selectLanguage: (state) => state.language,
  },
});

export default systemSlice;

export const { setIsMobile, resetSystemSlice, toggleNavDrawer, setDirection, setLanguage } = systemSlice.actions;
export const { selectIsMobile, selectNavDrawerOpen, selectDirection, selectLanguage } = systemSlice.selectors;
