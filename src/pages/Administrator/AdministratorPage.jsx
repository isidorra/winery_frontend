import { useEffect, useState } from "react";
import useStateContext, { stateContext } from "../../hooks/useStateContext"
import axios from "axios";
import { roleMapping } from "../../helpers/roleMapping";
import * as Yup from "yup";


const AdministratorPage = () => {
    const {context} = useStateContext(stateContext);
    const [employees, setEmployees] = useState([]);
    const [isFormOpen, setFormOpen] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [role, setRole] = useState(null);
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState("");

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
        phoneNumber: Yup.string()
          .matches(/^\d{9,10}$/, "Invalid phone number format")
          .required("Phone Number is required"),
        birthDate: Yup.date()
          .max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)), "Employee must be at least 18 years old")
          .required("Birth Date is required"),
        gender: Yup.number().required("Gender is required"),
        profilePhoto: Yup.string().required("Profile photo is required.")
      });

    const handleFormOpen = () => setFormOpen(!isFormOpen);

    const getEmployees = async() => {
        try {
            const response = await axios.get("http://localhost:5257/api/employees/");
            setEmployees(response.data);
        } catch(error) {
            console.log(error);
        }
    }

    
    

    const handleCreateEmployee = async(e) => {
        e.preventDefault();
        try {
            await validationSchema.validate(
                {
                  firstName,
                  lastName,
                  email,
                  username,
                  password,
                  phoneNumber,
                  birthDate,
                  gender,
                  profilePhoto
                },
                { abortEarly: false }
              );
            const response = await axios.post("http://localhost:5257/api/employeeRegister", {
                firstName,
                lastName,
                email,
                username,
                password,
                phoneNumber,
                role,
                birthDate,
                gender,
                profilePhoto
            });
            console.log(response);
            
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const newErrors = {};
                error.inner.forEach((validationError) => {
                  newErrors[validationError.path] = validationError.message;
                });
                setErrors(newErrors);
              } else {
                console.log(error);
                setServerError("Username is taken.");
              }
        }
    }
    useEffect(() => {
        getEmployees();
    })
  return (
    <div className="max-container py-36">
        <div className="flex items-center justify-between">
            <h2 className="text-6xl font-dorsa tracking-wide">Employees</h2>
            <button onClick={handleFormOpen}
                    className="border border-neutral-300 rounded-md p-2">
                    {isFormOpen ? "Cancel" : "New Employee"}
            </button>
        </div>
        {isFormOpen && <div className="mt-7">
            <form onSubmit={handleCreateEmployee}>
                {serverError && <p className="text-red-500">{serverError}</p>}
                <div className="flex items-center gap-5">
                    <div>
                        <label>Firstname</label>
                        <input value={firstName}
                               onChange={e => setFirstName(e.target.value)}
                               className="block bg-white-smoke p-1 drop-shadow-lg"/>
                        {errors.firstName && <p className="text-red-500 text-sm font-light">{errors.firstName}</p>}
                    </div>
                    <div>
                        <label>Lastname</label>
                        <input value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                className="block bg-white-smoke p-1 drop-shadow-lg"/>
                        {errors.lastName && <p className="text-red-500 text-sm font-light">{errors.lastName}</p>}
                    </div>
                    <div>
                        <label>Email</label>
                        <input value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="block bg-white-smoke p-1 drop-shadow-lg"/>
                        {errors.email && <p className="text-red-500 text-sm font-light">{errors.email}</p>}
                    </div>
                    <div>
                        <label>Username</label>
                        <input value={username}
                                onChange={e => setUsername(e.target.value)}
                                className="block bg-white-smoke p-1 drop-shadow-lg"/>
                        {errors.username && <p className="text-red-500 text-sm font-light">{errors.username}</p>}
                    </div>
                    <div>
                        <label>Password</label>
                        <input value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="block bg-white-smoke p-1 drop-shadow-lg w-full"
                                type="password"/>
                        {errors.password && <p className="text-red-500 text-sm font-light">{errors.password}</p>}
                    </div>
                    <div>
                        <label>Birth Date</label>
                        <input value={birthDate}
                                onChange={e => setBirthDate(e.target.value)}
                                className="block bg-white-smoke p-1 drop-shadow-lg w-full" 
                                type="date"/>
                        {errors.birthDate && <p className="text-red-500 text-sm font-light">{errors.birthDate}</p>}
                    </div>
                </div>
                <div className="flex items-end justify-between mt-5">
                    <div className="flex items-start gap-5">
                        <div>
                            <label>Phone Number</label>
                            <input value={phoneNumber}
                                    onChange={e => setPhoneNumber(e.target.value)}
                                    className="block bg-white-smoke p-1 drop-shadow-lg"/>
                            {errors.phoneNumber && <p className="text-red-500 text-sm font-light">{errors.phoneNumber}</p>}
                        </div>
                        <div>
                            <label>Profile Photo</label>
                            <input
                                value={profilePhoto}
                                onChange={e => setProfilePhoto(e.target.value)}
                                className="block bg-white-smoke p-1 drop-shadow-lg w-full"/>
                            {errors.profilePhoto && <p className="text-red-500 text-sm font-light">{errors.profilePhoto}</p>}
                        </div>
                        <div>
                            <label>Role</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(parseInt(e.target.value))}
                                className="block bg-white-smoke p-1 drop-shadow-lg w-full">
                                {Object.keys(roleMapping)
                                    .filter((roleNumber) => roleMapping[roleNumber] !== "Customer")
                                    .map((roleNumber) => (
                                    <option key={roleNumber} value={roleNumber}>
                                        {roleMapping[roleNumber]}
                                    </option>
                                    ))}
                            </select>
                        </div>
                        
                        <div>
                            <label className="block capitalize text-primary">Gender</label>
                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="0"
                                className="mr-1"
                                onChange={e => setGender(parseInt(e.target.value))}
                            />
                            <label htmlFor="male" className="mr-3">Female</label>
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="1"
                                className="mr-1"
                                onChange={e => setGender(parseInt(e.target.value))}
                            />
                            <label htmlFor="female">Male</label>
                            {errors.gender && <p className="text-red-500 text-sm font-light">{errors.gender}</p>}
                        </div>
                    </div>
                    <button className="bg-primary text-white p-2 rounded-md">Add Employee</button>
                </div>
            </form>
        </div>}
        

        <table className="table-auto w-full mt-10 mx-auto">
            <thead className="table-auto">
                
                <tr className="text-left">
                    <th className="border border-neutral-300 bg-primary text-secondary font-normal p-2">Role</th>
                    <th className="border border-neutral-300 bg-primary text-secondary font-normal p-2">Firstname</th>
                    <th className="border border-neutral-300 bg-primary text-secondary font-normal p-2">Lastname</th>
                    <th className="border border-neutral-300 bg-primary text-secondary font-normal p-2">Email</th>
                    <th className="border border-neutral-300 bg-primary text-secondary font-normal p-2">Username</th>
                    <th className="border border-neutral-300 bg-primary text-secondary font-normal p-2">Phone Number</th>
                    <th className="border border-neutral-300 bg-primary text-secondary font-normal p-2">Birth Date</th>
                    <th className="border border-neutral-300 bg-primary text-secondary font-normal p-2">Gender</th>
                    <th className="border border-neutral-300 bg-primary text-secondary font-normal p-2">Profile Photo</th>
                </tr>
                
            </thead>
            <tbody className="table-fixed">
            {employees.map((item, index) => 
            
            <tr key={index}>
                    <td className="border border-neutral-300 p-2">{roleMapping[item.role]}</td>
                    <td className="border border-neutral-300 p-2">{item.firstname}</td>
                    <td className="border border-neutral-300 p-2">{item.lastname}</td>
                    <td className="border border-neutral-300 p-2">{item.email}</td>
                    <td className="border border-neutral-300 p-2">{item.username}</td>
                    <td className="border border-neutral-300 p-2">{item.phoneNumber}</td>
                    <td className="border border-neutral-300 p-2">{new Date(item.birthDate).toLocaleDateString()}</td>
                    <td className="border border-neutral-300 p-2">{item.gender == "1" ? "Male" : "Female"}</td>
                    <td className="border border-neutral-300 p-2"><img src={item.profilePhoto} className="h-10 mx-auto"/></td>
            </tr>)}

            </tbody>
        </table>
    </div>
  )
}

export default AdministratorPage