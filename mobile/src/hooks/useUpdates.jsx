import { useEffect } from 'react';
import { AppState } from 'react-native';
import { Updates } from 'expo';

function useUpdates() {
  async function handleStateChange(state) {
    if (state === 'active') {
      if (__DEV__) {
        // we don't check for updates in dev, cause you cant
        // but we'll log it for now
        console.log('AppState is now active');
      } else {
        try {
          const update = await Updates.checkForUpdateAsync();
          if (update.isAvailable) {
            await Updates.fetchUpdateAsync();
            Updates.reloadFromCache();
          }
        } catch (e) {
          // handle or log error
          console.log(e);
        }
      }
    }
  }

  useEffect(() => {
    AppState.addEventListener('change', handleStateChange);

    return () => {
      AppState.removeEventListener('change', handleStateChange);
    };
  }, []);
}

export default useUpdates;
