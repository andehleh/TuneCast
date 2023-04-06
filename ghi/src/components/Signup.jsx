import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useToken();
  const navigate = useNavigate();
  const accountData = {
    "username": username,
    "password": password
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(accountData, `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/accounts`);
    navigate('/');
  };

  return (
    <div className="">
      <div className="bg-gray-200 rounded w-1/4 py-16 px-12 m-16 flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="userName" className="sr-only">Username</label>
            <input className="border-solid border border-gray-400 rounded px-2 py-3" type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value) }
                 />
          </div>
          <div>
            <label htmlFor="userPassword" className="sr-only">Password</label>
            <input className="border-solid border border-gray-400 rounded px-2 py-3" type="password" name="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}  />
          </div>
            <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold w-full py-3" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
export default Signup
