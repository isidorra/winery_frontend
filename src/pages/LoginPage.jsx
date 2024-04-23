import axios from "axios";
import { useEffect, useState } from "react";
import useStateContext from "../hooks/useStateContext";
import { Link, Navigate } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import * as Yup from "yup";


const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {context, setContext, resetContext} = useStateContext();
  const [redirect, setRedirect] = useState(false);

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate({ username, password }, { abortEarly: false });
      const response = await axios.post("http://localhost:5257/api/login", {username, password});
      setContext({username: response.data.username, role: response.data.role});
      setRedirect(true);
      
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((validationError) => {
          newErrors[validationError.path] = validationError.message;
        });
        setErrors(newErrors);
      } else {
        setServerError("Wrong username or password.");
      }
    }
  }
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, username: "" }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
  };


  if (redirect) return <Navigate to={"/profile"}/>;
  

  return (
    <div className="auth-background bg-primary">
      <form onSubmit={handleLogin} 
            className="w-full mx-auto md:ml-auto md:mr-0 md:w-1/2 nav-gradient h-screen pt-36 px-10 md:pl-16">
        <h2 className="font-dorsa text-6xl md:mt-10 text-secondary">Sign In</h2>
        <p className="text-lg text-white-smoke font-thin mb-5">Welcome back! Sign in into your account.</p>

        {serverError && <p className="text-red-500">{serverError}</p>}
        <label className="text-white-smoke opacity-80">Username</label>
        <input value={username}
               onChange={e => setUsername(e.target.value)}
               className="block bg-white-smoke rounded-md p-3 outline-none w-11/12 md:w-2/3 mb-2 text-lg" 
               placeholder="Username"
               type="text"/>
        {errors.username && <p className="text-red-500">{errors.username}</p>}

        <label className="text-white-smoke opacity-80">Password</label>
        <input value={password}
               onChange={e => setPassword(e.target.value)}
               className="block bg-white-smoke rounded-md p-3 outline-none w-11/12 md:w-2/3 mb-2 text-lg" 
               placeholder="Password"
               type="password"/>
        {errors.password && <p className="text-red-500">{errors.password}</p>}
               
        <p className="text-white-smoke text-lg mt-1">
          Don't have an account? <Link to={"/register"} className="text-secondary">Sign Up</Link>
        </p>
        <button className="bg-secondary text-primary py-3 rounded-md mt-4 w-2/3 text-lg hover:pt-4 duration-300">
          Sign In
        </button>
      </form>
      
    </div>
  );
};

export default LoginPage;
