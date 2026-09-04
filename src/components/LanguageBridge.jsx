import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { translateDOM } from '../i18n/domTranslator';

export default function LanguageBridge() {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const currentLang = i18n.language || localStorage.getItem('sahakar_language') || 'en';
    document.documentElement.lang = currentLang;

    // Direct run
    translateDOM(document.body, currentLang);

    // Debounced observer for route changes, modals, and dynamic data loads
    let timeoutId = null;
    const observer = new MutationObserver(() => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        translateDOM(document.body, currentLang);
      }, 50);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: false
    });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [i18n.language, location.pathname]);

  return null;
}
