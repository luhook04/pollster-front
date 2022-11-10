type UserType = {
  username: string;
  _id: string;
};

export type InitialStateType = {
  isAuthenticated: boolean;
  token?: string;
  user: UserType;
};

const authReducer = (state: InitialStateType, action: any) => {
  switch (action.type) {
    case 'login':
      const token: string = action.payload.token;
      const _id: string = action.payload.user._id;
      const username: string = action.payload.user.username;
      const user = { username, _id };

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return {
        ...state,
        isAuthenticated: true,
        token: token,
        user: {
          _id: _id,
          username: username,
        },
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
