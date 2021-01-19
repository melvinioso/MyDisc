import React, { useContext } from 'react';
import { BaseNavigationContainer } from '@react-navigation/native';
import { combineProviders } from 'react-combine-providers';

import './theme';

import { AppProvider, AppContext } from './context/app';

import Loading from './screens/Loading';
import Main from './navigators/Main';
import Background from './components/Background';

function App() {
  const { booted } = useContext(AppContext);

  if (!booted) {
    return (
      <Background source={{}}>
        <Loading />
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
provider.push(BaseNavigationContainer);

const MasterProvider = provider.master();

function AppContainer() {
  return (
    <MasterProvider>
      <App />
    </MasterProvider>
  );
}

export default AppContainer;
