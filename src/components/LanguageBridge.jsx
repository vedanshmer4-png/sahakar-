import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { translateDOM } from '../i18n/domTranslator';

export default function LanguageBridge() {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const currentLang = i18n.language || 'en';
    
    // Initial run
    translateDOM(document.body, currentLang);

    // MutationObserver to translate any newly mounted nodes (modals, route changes, data loads)
    const observer = new MutationObserver(() => {
      translateDOM(document.body, currentLang);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: false
    });

    return () => observer.disconnect();
  }, [i18n.language, location.pathname]);

  return null;
}
