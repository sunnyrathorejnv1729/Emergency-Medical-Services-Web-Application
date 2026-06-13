import { createContext, useContext, useState, useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import { LOGIN, REGISTER } from '../graphql/operations';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ems_user')); } catch { return null; }
  });
  const apolloClient = useApolloClient();

  const [loginMutation] = useMutation(LOGIN);
  const [registerMutation] = useMutation(REGISTER);

  const login = async (email, password) => {
    const { data } = await loginMutation({ variables: { email, password } });
    const { token, user: u } = data.login;
    localStorage.setItem('ems_token', token);
    localStorage.setItem('ems_user', JSON.stringify(u));
    setUser(u);
    return u;
  };

  const register = async (input) => {
    const { data } = await registerMutation({ variables: { input } });
    const { token, user: u } = data.register;
    localStorage.setItem('ems_token', token);
    localStorage.setItem('ems_user', JSON.stringify(u));
    setUser(u);
    return u;
  };

  const logout = async () => {
    localStorage.removeItem('ems_token');
    localStorage.removeItem('ems_user');
    setUser(null);
    await apolloClient.clearStore();
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
