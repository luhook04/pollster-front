export type User = {
  username: string;
  _id: string;
};

export type InitialStateType = {
  isAuthenticated: boolean;
  token: string;
  user: User;
};

const authReducer = (state: InitialStateType, action: any) => {
  let user: User;
  switch (action.type) {
    case 'login':
      const _id: string = action.payload.body._id;
      const username: string = action.payload.body.username;
      user = { username, _id };
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(user));

      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: user,
      };

    case 'remainLoggedIn':
      user = JSON.parse(action.payload.body);
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', action.payload.body);

      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: user,
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
