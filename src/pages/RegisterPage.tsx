import { Link } from "react-router-dom";
import bottle from "../assets/image/bottle.png";

const RegisterPage = () => {
  return (
    <div className="h-screen py-36 auth-background">
      <img src={bottle} alt="Bottle" className="absolute bottom-0 left-0 z-40 h-screen"/>
      <div className="auth-container p-10 bg-secondary opacity-80 rounded-lg flex items-center justify-between">
        
        <form className="ml-auto pr-10">
          <h2 className="font-dorsa text-6xl text-primary">Create An Account</h2>
          <p className="text-accent">*All fields are required.</p>

          <div className="flex items-center gap-5 mt-5">
            <div>
              <label className="block capitalize text-primary">First Name</label>
              <input className="test drop-shadow-lg opacity-90 w-full p-2 rounded-md outline-none" placeholder="First Name"/>
            </div>


            <div>
              <label className="block capitalize text-primary">Last Name</label>
              <input className="test drop-shadow-lg opacity-90 w-full p-2 rounded-md outline-none" placeholder="Last Name"/>
            </div>
          </div>

          <div className="flex items-center gap-5 mt-5">
            <div>
              <label className="block capitalize text-primary">Email Address</label>
              <input className="w-full test drop-shadow-lg opacity-90 p-2 rounded-md outline-none" placeholder="Email Address"/>
            </div>


            <div>
              <label className="block capitalize text-primary">Username</label>
              <input className="test drop-shadow-lg opacity-90 w-full p-2 rounded-md outline-none" placeholder="Username"/>
            </div>
          </div>

          <div className="flex items-center gap-5 mt-5">
            <div>
              <label className="block capitalize text-primary">Password</label>
              <input className="test drop-shadow-lg opacity-90 w-full p-2 rounded-md outline-none" placeholder="Password"/>
            </div>


            <div>
              <label className="block capitalize text-primary">Birth Date</label>
              <input className="test drop-shadow-lg opacity-90 w-full p-2 rounded-md outline-none" type="date"/>
            </div>
          </div>

          <div className="flex items-start gap-5 mt-5">
            
            <div>
              <label className="block capitalize text-primary">Confirm Password</label>
              <input className="test drop-shadow-lg opacity-90 w-full p-2 rounded-md outline-none" placeholder="Confirm Password"/>
            </div>


            <div>
              <label className="block capitalize text-primary">Gender</label>
              <input type="radio" className="mr-1"/><label className="mr-3">Male</label>
              <input type="radio" className="mr-1"/><label className="mr-3">Female</label>
            </div>
          </div>
          <p className="mt-3">Already have an account? <Link to="/login" className="text-accent">Sign In</Link></p>
          <button className="hover:bg-darker-accent duration-200 bg-primary w-1/3 text-white-smoke mx-auto rounded-md py-2 mt-3">Sign Up</button>

          
         

        </form>
      </div>
    </div>
  )
}

export default RegisterPage