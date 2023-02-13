import React, { createContext, useReducer, useEffect } from 'react';
import authReducer, { User } from './authReducer';
import { InitialStateType } from './authReducer';

type Props = {
  children?: React.ReactNode;
};

type Answer = {
  answer: string;
  votes: string[];
};

// type Poll = {
//   author: string;
//   question: string;
//   answers: Answer[];
//   timestamp: Date;
// };

const initialState = {
  isAuthenticated: false,
  token: '',
  user: {
    username: '',
    _id: '',
    profilePicUrl: '',
    polls: [],
    friendRequests: [],
    friends: [],
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
    const body: string | null = localStorage.getItem('user');

    if (token && body) {
      token &&
        dispatch({
          type: 'remainLoggedIn',
          payload: { token: token, body: body },
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
