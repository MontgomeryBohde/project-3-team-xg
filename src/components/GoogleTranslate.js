/**
 * @file GoogleTranslate.js
 * @description This file contains the GoogleTranslate component which integrates the Google Translate widget into a React application.
 * @requires react
 * @requires react.useEffect
 */

import React, { useEffect } from 'react';

/**
 * GoogleTranslate component to integrate Google Translate widget.
 * 
 * This component loads the Google Translate script and initializes the
 * translation widget on the page.
 * 
 * @component
 * @returns {JSX.Element} The GoogleTranslate component.
 */
const GoogleTranslate = () => {
  useEffect(() => {
    const googleTranslateScriptId = 'google-translate-script';

    /**
     * Initializes the Google Translate Element.
     * 
     * This function is called once the Google Translate script is loaded.
     * It creates a new instance of the Google Translate Element with the
     * specified page language and element ID.
     */
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