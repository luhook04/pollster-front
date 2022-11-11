const Signup = () => {
  return (
    <div>
      <span>&times;</span>
      <h3>Signup</h3>
      <form action="POST">
        <div>
          <input type="text" placeholder="Enter Username" name="username" />
          <input type="password" placeholder="Enter Password" name="password" />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirm-password"
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
