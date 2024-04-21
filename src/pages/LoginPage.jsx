import axios from "axios";
import { useEffect, useState } from "react";
import useStateContext from "../hooks/useStateContext";
import { Navigate } from "react-router-dom";
import ProfilePage from "./ProfilePage";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {context, setContext, resetContext} = useStateContext();
  const [redirect, setRedirect] = useState(false);

  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5257/api/login", {username, password});
      setContext({username: response.data.username, role: response.data.role});
      setRedirect(true);
      
    } catch (e) {
      console.log(e);
    }
    
    
  }
  if (redirect) return <Navigate to={"/profile"}/>;
  

  return (
    <div className="max-container pt-36">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>

        <label>Username</label>
        <input value={username}
               onChange={e => setUsername(e.target.value)}
               className="block border border-neutral-400" 
               placeholder="Username"/>

        <label>Password</label>
        <input value={password}
               onChange={e => setPassword(e.target.value)}
               className="block border border-neutral-400" 
               placeholder="Password"/>

        <button className="bg-primary text-white px-6 mt-2">Login</button>
      </form>
      
    </div>
  );
};

export default LoginPage;
