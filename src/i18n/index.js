import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { TRANSLATIONS } from './translations';
import { ALL_LANGUAGES } from './languages';

// Map all translations into i18next resources
const resources = {};
ALL_LANGUAGES.forEach(lang => {
  resources[lang.code] = {
    translation: TRANSLATIONS[lang.code] || TRANSLATIONS['en']
  };
});

// Load saved language or default to English
const savedLang = localStorage.getItem('sahakar_language') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export { ALL_LANGUAGES };
export default i18n;
