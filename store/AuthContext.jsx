import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState } from 'react';
import { AcsessToken, UserKey } from '../constants';

export const AuthContext = createContext({
  token: '',
  user: {},
  isAuthenticated: false,
  authenticate: (token, user) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [userData, setUser] = useState({});

  function authenticate(token, user) {
    setAuthToken(token);
    setUser(user);
    AsyncStorage.setItem(AcsessToken, token);
    AsyncStorage.setItem(UserKey, JSON.stringify(user));
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem(AcsessToken);
    AsyncStorage.removeItem(UserKey);
  }

  const value = {
    token: authToken,
    user: userData,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
