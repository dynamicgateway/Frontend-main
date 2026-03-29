// import all namespaces (for the default language, only)
import type en from '@/assets/locales/en.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en';
    resources: {
      en: typeof en;
    };
  }
}
