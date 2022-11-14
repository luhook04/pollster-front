import React, { useContext } from 'react';
import { AuthContext } from '../context/context';

const Login = () => {
  const { state } = useContext(AuthContext);
  console.log(state);
  return <h1>asdf</h1>;
};

export default Login;
