import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import useStateContext from "../hooks/useStateContext";
import { Navigate } from "react-router-dom";


const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState(null);

  const {context, setContext, resetContext} = useStateContext();
  const [redirect, setRedirect] = useState(false);
  
  const handleRegister = async(e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5257/api/register", {
        firstName,
        lastName,
        email,
        username,
        password,
        phoneNumber,
        birthDate,
        gender
      });

      setContext({username: response.data.username, role: response.data.role});
      setRedirect(true);
    } catch (e) {
      console.log(e);
    }
  }

  if (redirect) return <Navigate to={"/profile"}/>;
  return (
    <div className="max-container pt-36">
      
        
        <form className="w-1/2" onSubmit={handleRegister}>
          <h2 className="font-dorsa text-6xl text-primary">Create An Account</h2>
          <p className="text-accent">*All fields are required.</p>

          <div className="flex items-center gap-5 mt-5">
            <div>
              <label className="block capitalize text-primary">First Name</label>
              <input value={firstName}
                     onChange={e => setFirstName(e.target.value)}
                     className="drop-shadow-lg opacity-90 w-full p-2 rounded-md outline-none" 
                     placeholder="First Name"/>
            </div>


            <div>
              <label className="block capitalize text-primary">Last Name</label>
              <input value={lastName}
                     onChange={e => setLastName(e.target.value)}
                     className=" drop-shadow-lg opacity-90 w-full p-2 rounded-md outline-none" 
                     placeholder="Last Name"/>
            </div>
          </div>

          <div className="flex items-center gap-5 mt-5">
            <div>
              <label className="block capitalize text-primary">Email Address</label>
              <input value={email}
                     onChange={e => setEmail(e.target.value)}
                     className="w-full  drop-shadow-lg opacity-90 p-2 rounded-md outline-none" 
                     placeholder="Email Address"/>
            </div>


            <div>
              <label className="block capitalize text-primary">Username</label>
              <input value={username}
                     onChange={e => setUsername(e.target.value)} 
                     className="drop-shadow-lg opacity-90 w-full p-2 rounded-md outline-none" 
                     placeholder="Username"/>
            </div>
          </div>

          <div className="flex items-center gap-5 mt-5">
            <div>
              <label className="block capitalize text-primary">Password</label>
              <input value={password}
                     onChange={e => setPassword(e.target.value)} 
                     className="drop-shadow-lg opacity-90 w-full p-2 rounded-md outline-none" 
                     placeholder="Password"/>
            </div>


            <div>
              <label className="block capitalize text-primary">Birth Date</label>
              <input value={birthDate}
                     onChange={e => setBirthDate(e.target.value)}
                     className="drop-shadow-lg opacity-90 w-full p-2 rounded-md outline-none" 
                     type="date"/>
            </div>
          </div>

          <div className="flex items-start gap-5 mt-5">
            
            <div>
              <label className="block capitalize text-primary">Confirm Password</label>
              <input value={passwordConfirmation}
                     onChange={e => setPasswordConfirmation(e.target.value)}
                     className="drop-shadow-lg opacity-90 w-full p-2 rounded-md outline-none" 
                     placeholder="Confirm Password"/>
            </div>


            <div>
              <label className="block capitalize text-primary">Gender</label>
              <input
                type="radio"
                id="male"
                name="gender"
                value="0"
                onChange={e => setGender(parseInt(e.target.value))}
              />
              <label htmlFor="male" className="mr-3">Male</label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="1"
                onChange={e => setGender(parseInt(e.target.value))}
              />
              <label htmlFor="female">Female</label>
            </div>
            </div>
            <input placeholder="Phone Number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
          <p className="mt-3">Already have an account? <Link to="/login" className="text-accent">Sign In</Link></p>
          <button className="hover:bg-darker-accent duration-200 bg-primary w-1/3 text-white-smoke mx-auto rounded-md py-2 mt-3">
            Sign Up
          </button>

          
         

        </form>
    </div>
  )
}

export default RegisterPage