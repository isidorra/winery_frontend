import { Link } from "react-router-dom";
import bottle from "../assets/image/bottle.png";
import { useState } from "react";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");


  // const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setBirthDate(e.target.value); // Convert value to string and set birthDate state variable
  // };

  // const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   //setGender(e.target.value as Gender); // Set gender state variable to the selected value
  // };

  async function register(ev) {
    ev.preventDefault();

    

    alert("Registration successfull........");
  }

  return (
    <div className="h-screen py-36 auth-background">
      <img src={bottle} alt="Bottle" className="absolute bottom-0 left-0 z-40 h-screen"/>
      <div className="auth-container p-10 bg-secondary opacity-80 rounded-lg flex items-center justify-between">
        
        <form className="w-1/2 ml-auto" onSubmit={register}>
          <h2 className="font-dorsa text-6xl text-primary">Create An Account</h2>
          <p className="text-accent">*All fields are required.</p>

          <div className="flex items-center gap-5 mt-5">
            <div>
              <label className="block capitalize text-primary">First Name</label>
              <input 
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                type="text"
                className="test drop-shadow-lg opacity-90 w-full p-2 rounded-md outline-none" 
                placeholder="First Name"/>
            </div>


            <div>
              <label className="block capitalize text-primary">Last Name</label>
              <input 
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                type="text"
                className="test drop-shadow-lg opacity-90 w-full p-2 rounded-md outline-none" 
                placeholder="Last Name"/>
            </div>
          </div>

          <div className="flex items-center gap-5 mt-5">
            <div>
              <label className="block capitalize text-primary">Email Address</label>
              <input 
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="text"
                className="w-full test drop-shadow-lg opacity-90 p-2 rounded-md outline-none" 
                placeholder="Email Address"/>
            </div>


            <div>
              <label className="block capitalize text-primary">Username</label>
              <input 
                value={username}
                onChange={e => setUsername(e.target.value)}
                type="text"
                className="test drop-shadow-lg opacity-90 w-full p-2 rounded-md outline-none" 
                placeholder="Username"/>
            </div>
          </div>

          <div className="flex items-center gap-5 mt-5">
            <div>
              <label className="block capitalize text-primary">Password</label>
              <input 
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="text"
                className="test drop-shadow-lg opacity-90 w-full p-2 rounded-md outline-none" 
                placeholder="Password"/>
            </div>


            <div>
              <label className="block capitalize text-primary">Birth Date</label>
              <input 
                value={""} // Convert Date object to string
                // onChange={handleDateChange}
                className="test drop-shadow-lg opacity-90 w-full p-2 rounded-md outline-none" 
                type="date"/>
            </div>
          </div>

          <div className="flex items-start gap-5 mt-5">
            
            <div>
              <label className="block capitalize text-primary">Confirm Password</label>
              <input 
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                className="test drop-shadow-lg opacity-90 w-full p-2 rounded-md outline-none" 
                placeholder="Confirm Password"/>
            </div>


            <div>
              <label className="block capitalize text-primary">Gender</label>
              <input
                type="radio"
                value={""}
                // onChange={handleGenderChange}
                className="mr-1"
              />
              <label className="mr-3">Male</label>
              <input
                type="radio"
                value={""}
                // onChange={handleGenderChange}
                className="mr-1"
              />
              <label className="mr-3">Female</label>
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