import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import { AsyncStorage } from '@react-native-community/async-storage';
import decode from 'jwt-decode';
import Constants from 'expo-constants';

import { createClient } from '../graphql/client';

const TOKEN_KEY = '@userToken';

export const AuthContext = createContext({});

const API_HOST = Constants.manifest.extra.apiHost;

export function AuthProvider({ children }) {
  const [authLoaded, setAuthloaded] = useState(false);
  const [token, setToken] = useState(null);
  const [client, setClient] = useState(null);
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState(null);

  useEffect(() => {
    (async () => {
      const storedToken = await AsyncStorage.getItem(TOKEN_KEY);

      if (storedToken) {
        setToken(storedToken);
      }

      setTimeout(() => {
        setAuthloaded(true);
      }, 200);
    })();
  }, []);

  async function logout() {
    setToken(null);
    setUser(null);
    setPermissions(null);
    await AsyncStorage.removeItem(TOKEN_KEY);
  }

  useEffect(() => {
    if (token) {
      const decoded = decode(token);
      const { user: usr, permissions: perm } = decoded;
      setUser(usr);
      setPermissions(perm);
      const newClient = createClient({ token, logout });
      setClient(newClient);
    }
  }, [token]);

  const isAuthenticated = !!token;

  async function login({ providerId, providerKey }) {
    console.log('i got here');
    console.log(`${API_HOST}/auth/user/login`);
    try {
      const res = await axios.post(`${API_HOST}/auth/user/login`, {
        providerId,
        providerKey,
      });

      const { token: newToken } = res.data;
      if (!newToken) {
        throw new Error('Missing token in response.');
      }

      await AsyncStorage.setItem(TOKEN_KEY, newToken);
      setToken(newToken);

      const decoded = decode(newToken);

      const { user: usr } = decoded;

      setUser(usr);
    } catch (e) {
      console.log(e);
      throw new Error('Error signing in.');
    }
  }

  async function register({ name, providerId, providerKey }) {
    try {
      const res = await axios.post(
        `${API_HOST}/auth/user/register`,
        {
          name,
          providerId,
          providerKey,
        },
        { headers: { 'content-type': 'application/json' } }
      );

      const { token: newToken } = res.data;
      if (!newToken) {
        throw new Error('Missing token in response.');
      }

      await AsyncStorage.setItem('@token', newToken);
      setToken(newToken);
    } catch (e) {
      console.log(e);
      throw new Error('Error signing in.');
    }
  }

  if (!authLoaded) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        client,
        isAuthenticated,
        user,
        permissions,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
