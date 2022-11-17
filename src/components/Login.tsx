import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/context';

const Login = () => {
  const { state, dispatch } = useContext(AuthContext);

  const [error, setError] = useState<string>('');
  const [user, setUser] = useState<{
    username: string;
    password: string;
  }>({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = JSON.stringify(user);

      const req = await fetch(
        'https://pollster-api-production.up.railway.app/api/login',
        {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      if (req.status !== 200) {
        setError('Incorrect Login Credentials');
      }
      const reqJson = await req.json();
      dispatch({ type: 'login', payload: reqJson });
    } catch (err) {
      return err;
    }
  };

  return (
    <form onSubmit={handleLogin} action="POST">
      <div>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          onChange={handleChange}
          value={user.username}
        />
        <input
          type="text"
          placeholder="Enter Password"
          name="password"
          onChange={handleChange}
          value={user.password}
        />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
      {error ? <div>{error}</div> : null}
    </form>
  );
};

export default Login;
