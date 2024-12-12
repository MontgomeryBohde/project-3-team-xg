"use client"

/**
 * @file BootstrapClient.js
 * @description This file contains the BootstrapClient component which loads Bootstrap's JavaScript bundle.
 * @requires react
 * @requires bootstrap/dist/js/bootstrap.bundle.min.js
 */

import { useEffect } from 'react';

/**
 * BootstrapClient component
 * 
 * This component uses the useEffect hook to load Bootstrap's JavaScript bundle when the component is mounted.
 * 
 * @function
 * @name BootstrapClient
 * @returns {null} This component does not render any JSX.
 */
function BootstrapClient() {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return null;
}

export default BootstrapClient;