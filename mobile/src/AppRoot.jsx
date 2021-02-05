import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { BaseNavigationContainer } from '@react-navigation/native';
import { combineProviders } from 'react-combine-providers';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import './theme';

import { AppProvider, AppContext } from './context/app';
import { AuthProvider, AuthContext } from './context/auth';
import { ToastProvider } from './context/toast';

import Loading from './screens/Loading';
import Main from './navigators/Main';
import Auth from './navigators/Auth';
import Background from './components/Background';

function App() {
  const { booted } = useContext(AppContext);
  const { isAuthenticated } = useContext(AuthContext);
  if (!booted) {
    return (
      <Background source={{}}>
        <Loading />
      </Background>
    );
  }

  if (!isAuthenticated) {
    return (
      <Background source={{}}>
        <Auth />
      </Background>
    );
  }

  return (
    <Background source={{}}>
      <Main />
    </Background>
  );
}

const provider = combineProviders();
provider.push(AppProvider);
provider.push(AuthProvider);
provider.push(ToastProvider);
provider.push(SafeAreaProvider);
provider.push(ActionSheetProvider);
provider.push(BaseNavigationContainer);

const MasterProvider = provider.master();

function AppContainer() {
  return (
    <MasterProvider>
      <App />
      <StatusBar style="dark" animated={true} />
    </MasterProvider>
  );
}

export default AppContainer;
