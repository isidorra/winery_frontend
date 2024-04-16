import bottle from "../assets/image/bottle.png";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="h-screen py-48 auth-background">
      <img src={bottle} alt="Bottle" className="absolute bottom-0 left-0 z-40 h-screen"/>
      <div className="auth-container p-10 bg-secondary opacity-80 rounded-lg flex items-center justify-between">
        
        <form className="w-2/3 ml-auto pr-10">
          <h2 className="font-dorsa text-6xl text-primary">Welcome Back!</h2>
          <div>
              <label className="block capitalize text-primary">Username</label>
              <input className="test drop-shadow-lg opacity-90 w-full p-2 rounded-md outline-none" placeholder="Username"/>
            </div>
            <div>
              <label className="block capitalize text-primary">Password</label>
              <input className="test drop-shadow-lg opacity-90 w-full p-2 rounded-md outline-none" placeholder="Password"/>
            </div>


          <p className="mt-3">Don't have an account? <Link to="/register" className="text-accent">Sign Up</Link></p>
          <button className="hover:bg-darker-accent duration-200 bg-primary w-1/3 text-white-smoke mx-auto rounded-md py-2 mt-3">Sign In</button>

          
         

        </form>
      </div>
    </div>
  );
};

export default LoginPage;
