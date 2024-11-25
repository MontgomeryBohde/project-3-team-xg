import React, { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    const googleTranslateScriptId = 'google-translate-script';

    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en' },
        'google_translate_element'
      );
    };

    if (!document.getElementById(googleTranslateScriptId)) {
      const script = document.createElement('script');
      script.id = googleTranslateScriptId;
      script.src =
        '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google && window.google.translate) {
      window.googleTranslateElementInit();
    }

    // No cleanup necessary since the component is persistent
  }, []);

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;