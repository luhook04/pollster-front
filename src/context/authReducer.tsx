type UserType = {
  username: string;
  _id: string;
};

export type InitialStateType = {
  isAuthenticated: boolean;
  token?: string;
  user?: UserType;
};

const authReducer = (state: InitialStateType, action: any) => {
  switch (action.type) {
    case 'login':
      let token: string = action.payload.token;
      let user = action.payload.body;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return {
        ...state,
        isAuthenticated: true,
        token: token,
        user: user,
      };

    case 'remainLoggedIn':
      const savedUser = action.payload.body;
      const savedToken = action.payload.token;
      localStorage.setItem('token', savedToken);
      localStorage.setItem('user', JSON.stringify(savedUser));
      return {
        ...state,
        token: savedToken,
        isAuthenticated: true,
        user: savedUser,
      };

    case 'logout':
      localStorage.clear();

      return {
        ...state,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export default authReducer;
