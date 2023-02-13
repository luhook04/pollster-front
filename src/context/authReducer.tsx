export type User = {
  username: string;
  _id: string;
  profilePicUrl: string;
  polls: string[];
  friends: string[];
  friendRequests: string[];
};

export type InitialStateType = {
  isAuthenticated: boolean;
  token: string;
  user: User;
};

const authReducer = (state: InitialStateType, action: any) => {
  let user;
  switch (action.type) {
    case 'login':
      user = JSON.stringify(action.payload.body);
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', user);

      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.body,
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
