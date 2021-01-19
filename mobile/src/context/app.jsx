import React, { useState, useEffect, createContext } from 'react';

import { loadAssetsAsync } from '../utils/loadAssets';

import useUpdates from '../hooks/useUpdates';

export const AppContext = createContext();

export function AppProvider({ children }) {
  useUpdates();

  const [booted, setBooted] = useState(false);

  useEffect(() => {
    async function bootApp() {
      // do your async work here
      // load icons
      // etc.

      await loadAssetsAsync();

      setBooted(true);
    }

    bootApp();
  }, []);

  return (
    <AppContext.Provider
      value={{
        booted,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
