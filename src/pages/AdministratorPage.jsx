import { useEffect, useState } from "react";
import useStateContext, { stateContext } from "../hooks/useStateContext"
import axios from "axios";

const AdministratorPage = () => {
    const {context} = useStateContext(stateContext);
    const [employees, setEmployees] = useState([]);

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

    const getEmployees = async() => {
        try {
            const response = await axios.get("http://localhost:5257/api/employees/");
            setEmployees(response.data);
        } catch(e) {
            console.log(e);
        }
    }

    const handleCreateEmployee = async(e) => {
        e.preventDefault();

        try {
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
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getEmployees();
    })
  return (
    <div className="max-container py-36">
        <h2 className="text-3xl">Users</h2>
        <div>
            <form onSubmit={handleCreateEmployee}>
                <div className="flex items-center gap-5">
                    <div>
                        <label>Firstname</label>
                        <input value={firstName}
                               onChange={e => setFirstName(e.target.value)}
                               className="block bg-white-smoke p-2 drop-shadow-lg"/>
                    </div>
                    <div>
                        <label>Lastname</label>
                        <input value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                className="block bg-white-smoke p-2 drop-shadow-lg"/>
                    </div>
                    <div>
                        <label>Email</label>
                        <input value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="block bg-white-smoke p-2 drop-shadow-lg"/>
                    </div>
                    <div>
                        <label>Username</label>
                        <input value={username}
                                onChange={e => setUsername(e.target.value)}
                                className="block bg-white-smoke p-2 drop-shadow-lg"/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="block bg-white-smoke p-2 drop-shadow-lg"/>
                    </div>
                </div>
                <div className="flex items-start gap-5 mt-5">
                    <div>
                        <label>Phone Number</label>
                        <input value={phoneNumber}
                                onChange={e => setPhoneNumber(e.target.value)}
                                className="block bg-white-smoke p-2 drop-shadow-lg"/>
                    </div>
                    <div>
                        <label>Role</label>
                        <input value={role}
                                onChange={e => setRole(parseInt(e.target.value))}
                                className="block bg-white-smoke p-2 drop-shadow-lg"/>
                    </div>
                    <div>
                        <label>Birth Date</label>
                        <input value={birthDate}
                                onChange={e => setBirthDate(e.target.value)}
                                className="block bg-white-smoke p-2 drop-shadow-lg" 
                                type="date"/>
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
                    <div>
                        <label>Profile Photo</label>
                        <input value={profilePhoto}
                                onChange={e => setProfilePhoto(e.target.value)}
                                className="block bg-white-smoke p-2 drop-shadow-lg"/>
                    </div>
                    <button className="bg-primary text-white p-2">Add User</button>
                </div>
            </form>
        </div>

        <div>
            {employees.map((item, index) => 
            
            <div key={index} className="flex items-center gap-4">
                <p>{item.firstname}</p>
                <p>{item.lastname}</p>
                <p>{item.role}</p>
            </div>)}
        </div>
    </div>
  )
}

export default AdministratorPage