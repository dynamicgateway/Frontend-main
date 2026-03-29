import { StyledEngineProvider } from '@mui/material';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import './index.css';
import i18n from '@/system/i18n';
import { store } from './store/store';
import '@/system/amplify-config';
import { DynamicThemeProvider } from '@/theme/dynamic-theme-provider';
import { App } from '@/app';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StyledEngineProvider injectFirst>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <DynamicThemeProvider>
            <App />
          </DynamicThemeProvider>
        </Provider>
      </I18nextProvider>
    </StyledEngineProvider>
  );
}
