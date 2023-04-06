import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useToken();
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    // let promise = new Promise(function(resolve, reject) {
    //   reject ("Whoops!");
    // });
    //   .catch((errors) => {
    //     console.log(errors)
    //   })
    e.preventDefault();
    console.log("*******************", e)
    login(username, password);
    navigate('/');
  };

  return (
    <div className="">
      <div className="bg-gray-200 rounded w-1/4 py-16 px-12 m-16 flex flex-col items-center justify-center">
        <img className="rounded-full h-32 w-32" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="user avatar" />
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="userName" className="sr-only">
              Username
            </label>
            <input
              className="border-solid border border-gray-400 rounded px-2 py-3"
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="userPassword" className="sr-only">
              Password
            </label>
            <input
              className="border-solid border border-gray-400 rounded px-2 py-3"
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-4 flex items-center">
            <input className="h-4 w-4 mr-2" type="checkbox" id="userRemember" />
            <label htmlFor="userRemember">Remember me</label>
          </div>
            <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold w-full py-3" type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
