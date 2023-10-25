import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import bnTranslation from './locales/bn.json';

i18n.use(initReactI18next).init({
  resources: {
    bn: { translation: bnTranslation }
  },
  lng: 'bn', // Set the default language to Bangla (Bengali)
  interpolation: { escapeValue: false } // Disable HTML escaping
});

export default i18n;