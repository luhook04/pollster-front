import { useState } from 'react';

const Signup = () => {
  const [newUser, setNewUser] = useState<{
    username: string;
    password: string;
    'confirm-password': string;
  }>({
    username: '',
    password: '',
    'confirm-password': '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <span>&times;</span>
      <h3>Signup</h3>
      <form action="POST">
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
      </form>
    </div>
  );
};

export default Signup;
