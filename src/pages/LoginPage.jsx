import { useState } from "react";
import bottle from "../assets/image/bottle.png";
import { Link, Navigate} from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import useAuth from "../hooks/useAuth";
//import jwt from "jsonwebtoken";
// import jwt from 'jsonwebtoken';
const LoginPage = () => {
  const [redirect, setRedirect] = useState(false);
  const {setAuth} = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

 

  const login = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post("http://localhost:5257/api/login", {username, password});
        console.log(response.data);
        const token = response.data.token;
        const decoded = jwtDecode(token);
        localStorage.setItem("token", token);
        const usernameDecoded = decoded.username;
        const roleDecoded = decoded.role;
    

        setAuth({usernameDecoded,roleDecoded, token});
        setRedirect(true);
    } catch (err) {
        console.log(err);
        setError(true);
    }

  }

  if(redirect)
    return <Navigate to={"/"}/>
  return (
    <div className="h-screen py-48 auth-background">
      <img src={bottle} alt="Bottle" className="absolute bottom-0 left-0 z-40 h-screen"/>
      <div className="auth-container p-10 bg-secondary opacity-80 rounded-lg flex items-center justify-between">
        
        <form className="w-2/3 ml-auto pr-10" onSubmit={login}>
            {error && <p className="text-accent">UNAUTHORIZED</p>}
          <h2 className="font-dorsa text-6xl text-primary">Welcome Back!</h2>
          <div>
              <label className="block capitalize text-primary">Username</label>
              <input value={username}
                      onChange={e => setUsername(e.target.value)}
                      autoComplete="off"
                      type="text" 
                      className="test drop-shadow-lg opacity-90 w-full p-2 rounded-md outline-none" 
                      placeholder="Username"/>
            </div>
            <div>
              <label className="block capitalize text-primary">Password</label>
              <input value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    className="test drop-shadow-lg opacity-90 w-full p-2 rounded-md outline-none" placeholder="Password"/>
            </div>


          <p className="mt-3">Don&apos;t have an account? <Link to="/register" className="text-accent">Sign Up</Link></p>
          <button className="hover:bg-darker-accent duration-200 bg-primary w-1/3 text-white-smoke mx-auto rounded-md py-2 mt-3">
            Sign In
          </button>

          
         

        </form>
      </div>
    </div>
  );
};

export default LoginPage;
