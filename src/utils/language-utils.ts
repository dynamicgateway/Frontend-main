import { PageDirection, AppLanguage } from '@/store/slices/system';

/**
 * Switches the app to Hebrew language with RTL direction
 * Dispatches Redux actions, saves to localStorage, and reloads the page
 */
export const switchToHebrew = (dispatch: any) => {
  dispatch({ type: 'system_slice/setDirection', payload: PageDirection.RTL });
  dispatch({ type: 'system_slice/setLanguage', payload: AppLanguage.HE });
  localStorage.setItem('app.direction', PageDirection.RTL);
  localStorage.setItem('app.language', AppLanguage.HE);
  location.reload();
};

/**
 * Switches the app to English language with LTR direction
 * Dispatches Redux actions, saves to localStorage, and reloads the page
 */
export const switchToEnglish = (dispatch: any) => {
  dispatch({ type: 'system_slice/setDirection', payload: PageDirection.LTR });
  dispatch({ type: 'system_slice/setLanguage', payload: AppLanguage.EN });
  localStorage.setItem('app.direction', PageDirection.LTR);
  localStorage.setItem('app.language', AppLanguage.EN);
  location.reload();
};
