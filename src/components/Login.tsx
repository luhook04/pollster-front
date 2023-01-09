import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/context';
import Signup from './Signup';

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const [showSignup, setShowSignup] = useState<boolean>(false);

  const [error, setError] = useState<string>('');
  const [user, setUser] = useState<{
    username: string;
    password: string;
  }>({
    username: '',
    password: '',
  });

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }, [error]);

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
      } else if (req.status === 200) {
        const reqJson = await req.json();
        JSON.stringify(reqJson);
        dispatch({ type: 'login', payload: reqJson });
      }
    } catch (err) {
      return err;
    }
  };

  const openSignup = (e: any) => {
    e.stopPropagation();

    setShowSignup(true);
  };

  const closeSignup = () => {
    if (showSignup) setShowSignup(false);
  };

  return (
    <div className="login-signup-container">
      <div className="login-container" onClick={closeSignup}>
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
            <span>or</span>
            <button onClick={openSignup} type="button">
              Create New Account
            </button>
          </div>
          {error ? <div>{error}</div> : null}
        </form>
      </div>
      {showSignup ? <Signup closeSignup={closeSignup}></Signup> : null}
    </div>
  );
};

export default Login;
