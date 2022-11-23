import { error } from 'console';
import React, { useState, useEffect } from 'react';

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

  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = JSON.stringify(newUser);

      const req = await fetch(
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
      if (req.ok) {
        closeSignup();
      }
      if (!req.ok) {
        const reqJson = await req.json();
        reqJson.errors.forEach((element: any) => {
          let msg = element.msg;
          setErrors((errors) => [...errors, msg]);
        });
      }
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      setTimeout(() => {
        setErrors([]);
      }, 3000);
    }
  }, [errors]);

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
        {errors.length > 0
          ? errors.map((error, index) => {
              return <p key={index}>{error}</p>;
            })
          : null}
      </form>
    </div>
  );
};

export default Signup;
