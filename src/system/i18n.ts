import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from '@/assets/locales/en.json';
import he from '@/assets/locales/he.json';

interface LanguageType {
  key: string;
  label: string;
  source: any;
  isRtl: boolean;
  fullLabel: string;
}

const Languages: Array<LanguageType> = [
  {
    key: 'en',
    label: 'En',
    fullLabel: 'English',
    isRtl: false,
    source: en,
  },
  {
    key: 'he',
    label: 'עב',
    fullLabel: 'Hebrew',
    isRtl: true,
    source: he,
  },
];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem('i18nextLng') || 'he',
    fallbackLng: 'he',
    resources: Languages.reduce((prev, curr) => ({ ...prev, [curr.key]: { translation: curr.source } }), {}),
  });

export default i18n;
