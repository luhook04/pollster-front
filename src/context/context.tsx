import React, { createContext, useReducer, useEffect } from 'react';
import authReducer from './authReducer';
import { InitialStateType } from './authReducer';

type Props = {
  children?: React.ReactNode;
};

const initialState = {
  isAuthenticated: false,
  token: '',
  user: {
    username: '',
    _id: '',
  },
};

const AuthContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token: string | null = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      token &&
        dispatch({ type: 'login', payload: { token: token, user: user } });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
