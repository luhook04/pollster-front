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
    <div className="fixed left-0 top-0 w-screen h-screen bg-white">
      <div className="mt-3 border-2 border-black rounded w-1/2 mx-auto py-3">
        <div className="flex flex-row w-11/12 mx-auto justify-center text-xl mb-3">
          <h3 className="ml-auto">Signup</h3>
          <span className="ml-auto cursor-pointer" onClick={closeSignup}>
            &times;
          </span>
        </div>
        <form action="POST" onSubmit={handleSignup}>
          <div className="flex flex-col items-center">
            <input
              className="shadow appearance-none border rounded w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter Username"
              name="username"
              onChange={handleChange}
              value={newUser.username}
            />
            <input
              className="shadow appearance-none border rounded w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={handleChange}
              value={newUser.password}
            />
            <input
              className="mb-3 shadow appearance-none border rounded w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Confirm Password"
              name="confirm-password"
              onChange={handleChange}
              value={newUser['confirm-password']}
            />
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              type="submit"
            >
              Create Account
            </button>
          </div>
          {errors.length > 0
            ? errors.map((error, index) => {
                return <p key={index}>{error}</p>;
              })
            : null}
        </form>
      </div>
    </div>
  );
};

export default Signup;
