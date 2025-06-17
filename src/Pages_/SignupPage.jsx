import React from "react";

const SignupPage = () => {
  return (
    <div>
      <label>name</label> <input type="text" />
      <label>lastname</label> <input type="text" />
      <label>Email</label> <input type="text" />
      <label>Password</label>
      <input type="password" />
      <label>Re-type Password</label>
      <input type="password" />
    </div>
  );
};

export default SignupPage;
