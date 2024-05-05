import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import useStateContext from "../../hooks/useStateContext";
import { Navigate } from "react-router-dom";
import * as Yup from "yup";



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

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(7, "Password must be at least 7 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{9,10}$/, "Invalid phone number format")
      .required("Phone Number is required"),
    birthDate: Yup.date()
      .max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)), "You must be at least 18 years old")
      .required("Birth Date is required"),
    gender: Yup.number().required("Gender is required"),
  });
  
  const handleRegister = async(e) => {
    e.preventDefault();
    

    try {
      await validationSchema.validate(
        {
          firstName,
          lastName,
          email,
          username,
          password,
          passwordConfirmation,
          phoneNumber,
          birthDate,
          gender,
        },
        { abortEarly: false }
      );

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
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((validationError) => {
          newErrors[validationError.path] = validationError.message;
        });
        setErrors(newErrors);
      } else {
        setServerError("Username is taken.");
      }
    }
  }

  if (redirect) return <Navigate to={"/profile"}/>;
  return (
    <div className="auth-background bg-primary h-full">
      
        
        <form onSubmit={handleRegister}
              className="w-full mx-auto md:ml-auto md:mr-0 h-auto md:w-1/2 nav-gradient pt-24 pb-24 px-10 md:pl-16">

          <h2 className="font-dorsa text-4xl md:text-6xl text-secondary">Create An Account</h2>
          <p className="text-accent text-sm">*All fields are required.</p>

          {serverError && <p className="text-red-500">{serverError}</p>}

          <div className="flex items-center mt-3 justify-between gap-3">
            <div className="w-full">
              <label className="text-white-smoke opacity-80">First Name</label>
              <input value={firstName}
                     onChange={e => setFirstName(e.target.value)}
                     className="md:block bg-white-smoke rounded-md p-2 md:p-3 w-full outline-none mb-2 md:text-lg" 
                     placeholder="First Name"/>
              {errors.firstName && <p className="text-red-500 text-sm font-light">{errors.firstName}</p>}
            </div>


            <div className="w-full">
              <label className="text-white-smoke opacity-80">Last Name</label>
              <input value={lastName}
                     onChange={e => setLastName(e.target.value)}
                     className="md:block bg-white-smoke rounded-md p-2 md:p-3 w-full outline-none mb-2 md:text-lg" 
                     placeholder="Last Name"/>
              {errors.lastName && <p className="text-red-500 text-sm font-light">{errors.lastName}</p>}
            </div>
          </div>

          <div className="flex items-center mt-3 justify-between gap-3">
            <div className="w-full">
              <label className="text-white-smoke opacity-80">Email Address</label>
              <input value={email}
                     onChange={e => setEmail(e.target.value)}
                     className="block bg-white-smoke rounded-md p-2 md:p-3 w-full outline-none mb-2 md:text-lg" 
                     placeholder="Email Address"/>
              {errors.email && <p className="text-red-500 text-sm font-light">{errors.email}</p>}
            </div>


            <div className="w-full">
              <label className="text-white-smoke opacity-80">Username</label>
              <input value={username}
                     onChange={e => setUsername(e.target.value)} 
                     className="block bg-white-smoke rounded-md p-2 md:p-3 w-full outline-none mb-2 md:text-lg" 
                     placeholder="Username"/>
              {errors.username && <p className="text-red-500 text-sm font-light">{errors.username}</p>}
            </div>
          </div>

          <div className="flex items-center mt-3 justify-between gap-3">
            <div className="w-full">
              <label className="text-white-smoke opacity-80">Password</label>
              <input value={password}
                     onChange={e => setPassword(e.target.value)} 
                     className="block bg-white-smoke rounded-md p-2 md:p-3 w-full outline-none mb-2 md:text-lg" 
                     placeholder="Password"
                     type="password"/>
              {errors.password && <p className="text-red-500 text-sm font-light">{errors.password}</p>}
            </div>

            <div className="w-full">
              <label className="text-white-smoke opacity-80">Confirm Password</label>
              <input value={passwordConfirmation}
                     onChange={e => setPasswordConfirmation(e.target.value)}
                     className="block bg-white-smoke rounded-md p-2 md:p-3 w-full outline-none mb-2 md:text-lg" 
                     placeholder="Confirm Password"
                     type="password"/>
              {errors.passwordConfirmation && <p className="text-red-500 text-sm font-light">{errors.passwordConfirmation}</p>}
            </div>
            
          </div>

          <div className="flex items-center mt-3 justify-between gap-3">
            <div className="w-full">
              <label className="text-white-smoke opacity-80">Phone Number</label>
              <input placeholder="Phone Number" 
                      value={phoneNumber} 
                      onChange={e => setPhoneNumber(e.target.value)}
                      className="block bg-white-smoke rounded-md p-2 md:p-3 w-full outline-none mb-2 md:text-lg"/>
              {errors.phoneNumber && <p className="text-red-500 text-sm font-light">{errors.phoneNumber}</p>}
            </div>
            <div className="w-full">
              <label className="text-white-smoke opacity-80">Birth Date</label>
              <input value={birthDate}
                     onChange={e => setBirthDate(e.target.value)}
                     className="block bg-white-smoke rounded-md p-2 md:p-3 w-full outline-none mb-2 md:text-lg" 
                     type="date"/>
              {errors.birthDate && <p className="text-red-500 text-sm font-light">{errors.birthDate}</p>}
            </div>
           
            
            
           
          </div>
          
          <div className="mb-5">
            <div className="w-full">
                <label className="text-white-smoke opacity-80 block">Gender</label>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="0"
                  onChange={e => setGender(parseInt(e.target.value))}
                  className="mr-1 mt-2"
                />
                <label htmlFor="male" className="text-white-smoke">Male</label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="1"
                  onChange={e => setGender(parseInt(e.target.value))}
                  className="mr-1 ml-4 mt-2"
                />
                <label htmlFor="female" className="text-white-smoke">Female</label>
                {errors.gender && <p className="text-red-500 text-sm font-light">{errors.gender}</p>}
            </div>
          </div>
                    
          <p className="text-white-smoke text-lg mt-1">
            Already have an account? <Link to={"/login"} className="text-secondary">Sign In</Link>
          </p>
          <button className="bg-secondary text-primary p-2 md:py-3 rounded-md mt-4 w-full md:text-lg hover:pt-4 duration-300">
            Sign Up
          </button>

          
         

        </form>
    </div>
  )
}

export default RegisterPage