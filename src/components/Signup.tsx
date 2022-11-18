import React, { useState, useRef, useEffect } from 'react';

const Signup = ({ closeSignup }: any) => {
  const [newUser, setNewUser] = useState<{
    username: string;
    password: string;
    'confirm-password': string;
  }>({
    username: '',
    password: '',
    'confirm-password': '',
  });

  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = JSON.stringify(newUser);

      const res = await fetch(
        'https://pollster-api-production.up.railway.app/api/sign-up',
        {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.status === 404) {
        setError('Oops... something went wrong');
      }
    } catch (err) {
      return setError('Oops... something went wrong');
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }, [error]);

  return (
    <div>
      <h3>Signup</h3>
      <span onClick={closeSignup}>&times;</span>
      <form action="POST" onSubmit={handleSignup}>
        <div>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            onChange={handleChange}
            value={newUser.username}
          />
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            onChange={handleChange}
            value={newUser.password}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirm-password"
            onChange={handleChange}
            value={newUser['confirm-password']}
          />
        </div>
        <div>
          <button type="submit">Create Account</button>
        </div>
        {error ? <div>{error}</div> : null}
      </form>
    </div>
  );
};

export default Signup;
