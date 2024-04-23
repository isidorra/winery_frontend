import { Navigate } from "react-router-dom";
import useStateContext, { stateContext } from "../hooks/useStateContext"
import LoginPage from "./LoginPage";
import { useEffect, useState } from "react";
import axios from "axios";
import userIcon from "../assets/icons/user.png";

const ProfilePage = () => {
  const {context} = useStateContext(stateContext);
  const [user, setUser] = useState(null);
  const [isOpenPersonalForm, setOpenPersonalForm] = useState(false);
  const [isOpenDeliveryForm, setOpenDeliveryForm] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [door, setDoor] = useState("");
  const [floor, setFloor] = useState("");

  const [cities, setCities] = useState(null);

  const handlePersonalForm = () => setOpenPersonalForm(!isOpenPersonalForm);
  const handleDeliveryForm = () => setOpenDeliveryForm(!isOpenDeliveryForm);
  

  const loadUser = async() => {
    try {
      if(context.role === 9) {
        const response = await axios.get(`http://localhost:5257/api/customers/username?username=${context.username}`);
        setUser(response.data);
        console.log(user);
      }
      else {
        const response = await axios.get(`http://localhost:5257/api/employees/username?username=${context.username}`);
        setUser(response.data);
      }
        
    } catch (e) {
      console.log(e);
    }
  }

  const loadCities = async() => {
    try {
      const response = await axios.get("http://localhost:5257/api/city");
      setCities(response.data);
      console.log(cities);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    loadUser();
    loadCities();
    if(context.username == "")
      return <Navigate to={"/login"}/>
  }, [context]);

  const handleEditDelivery = async(e) => {
    e.preventDefault();
    try {
      if(context.role === 9  && user) {
        const response = await axios.post(`http://localhost:5257/api/customers/edit/customer/username?username=${context.username}`, {
          street,
          number,
          floor,
          door,
          city,
        });
        console.log(response);
      }

    } catch (e) {
      console.log(e);
    }
  }


  const handleEditPersonal = async(e) => {
    e.preventDefault();

    try {
      if(context.role === 9  && user) {
        const response = await axios.post(`http://localhost:5257/api/customers/edit/customer/username?username=${context.username}`, {
          firstName,
          lastName,
          email,
          password,
          phoneNumber
        });
        console.log(response);
      } else {
        const response = await axios.post(`http://localhost:5257/api/employees/edit/employee/username?username=${context.username}`,{
          firstName, 
          lastName, 
          email,
          password, 
          phoneNumber,
        });

        console.log(response);
      }
    } catch (e) {

    }
  }

  return (
    <div className="">
      <div className="max-container py-36">
          
          {user && 
          <>
           
            <div>
                    <div className="w-3/4 flex items-center justify-around gap-10 nav-gradient drop-shadow-lg rounded-md p-10 mx-auto">
                        <img src={user.role === 9 ? userIcon : user.profilePhoto} className="w-40 rounded-md"/>
                        <div className="text-white-smoke">
                          <h3 className="text-6xl font-dorsa text-secondary">Personal Info</h3>
                          <p>{user.firstname} {user.lastname}</p>
                          <p>{user.email}</p>
                          <p>{new Date(user.birthDate).toLocaleDateString()}</p>
                          <p>{user.gender == 0 ? "Male" : "Female"}</p>
                          <p>{user.phoneNumber}</p>
                          <button onClick={handlePersonalForm} className="bg-secondary p-2 w-full rounded-md text-primary mt-3">
                            {isOpenPersonalForm ? "Cancel" : "Edit Personal Info"}
                          </button>
                        </div>

                        {user.role === 9 && 
                        <div className="text-white-smoke">
                            <h3 className="text-6xl font-dorsa text-secondary">Delivery Info</h3>
                            <p>Street: {user.street}</p>
                            <p>Door: {user.door}</p>
                            <p>City: {cities && user.cityId && (
                              cities.map(city => {
                                if (city.id === user.cityId) {
                                  return `${city.name}, ${city.zip}`;
                                }
                                return null;
                              }).filter(city => city)[0] // Select the first matching city
                            )}</p>
                            <p>Floor: {user.floor}</p>
                            <p>Number: {user.number}</p>
                            <button onClick={handleDeliveryForm} className="bg-secondary p-2 w-full rounded-md text-primary mt-3">
                              {isOpenDeliveryForm ? "Cancel" : "Edit Delivery Info"}
                            </button>
                        </div>}

                      
                    </div>
            </div>

       
          
            {isOpenPersonalForm && 
            <div>
              
              <form onSubmit={handleEditPersonal} className="mt-10 mx-auto justify-center w-3/4 nav-gradient rounded-md drop-shadow-lg p-10">
                <h3 className="mt-5 mb-10 text-center text-secondary text-3xl">Edit Personal Info</h3>
                <div className="flex items-center gap-5 justify-center">
                  <div>
                    <label className="text-white-smoke">First Name</label>
                    <input value={firstName} 
                          onChange={e => setFirstName(e.target.value)}
                          className="bg-white-smoke block p-2 drop-shadow-lg outline-none"/>
                  </div>

                  <div>
                    <label className="text-white-smoke">Last Name</label>
                    <input value={lastName} 
                          onChange={e => setLastName(e.target.value)}
                          className="bg-white-smoke block p-2 drop-shadow-lg outline-none"/>
                  </div>

                  <div>
                    <label className="text-white-smoke">Email Address</label>
                    <input value={email} 
                          onChange={e => setEmail(e.target.value)}
                          className="bg-white-smoke block p-2 drop-shadow-lg outline-none"/>
                  </div>
                </div>

                <div className="flex items-center gap-5 justify-center">
                  <div>
                    <label className="text-white-smoke">Password</label>
                    <input value={password} 
                          onChange={e => setPassword(e.target.value)}
                          className="bg-white-smoke block p-2 drop-shadow-lg outline-none"/>
                  </div>

                  <div>
                    <label className="text-white-smoke">Confirm Password</label>
                    <input value={passwordConfirmation} 
                          onChange={e => setPasswordConfirmation(e.target.value)}
                          className="bg-white-smoke block p-2 drop-shadow-lg outline-none"/>
                  </div>

                  <div>
                    <label className="text-white-smoke">Phone Number</label>
                    <input value={phoneNumber} 
                          onChange={e => setPhoneNumber(e.target.value)}
                          className="bg-white-smoke block p-2 drop-shadow-lg outline-none"/>
                  </div>
                </div>
                <div className="w-2/3 text-center mx-auto justify-center">
                  <button className="bg-primary text-white py-2 my-10 w-full">Edit</button>
                </div>
                
              </form>
            </div>}

            {user.role === 9 && isOpenDeliveryForm &&
            <div>
                
                <form onSubmit={handleEditDelivery} className="mt-10 mx-auto justify-center w-3/4 nav-gradient rounded-md drop-shadow-lg p-10">
                  <h3 className="mt-5 mb-10 text-center text-secondary text-3xl">Edit Delivery Info</h3>
                  <div className="flex items-center gap-5 justify-center">
                    <div>
                      <label className="text-white-smoke">Street</label>
                      <input value={street} 
                            onChange={e => setStreet(e.target.value)}
                            className="bg-white-smoke block p-2 drop-shadow-lg"/>
                    </div>

                    <div>
                      <label className="text-white-smoke">Number</label>
                      <input value={number} 
                            onChange={e => setNumber(e.target.value)}
                            className="bg-white-smoke block p-2 drop-shadow-lg"/>
                    </div>

                    <div>
                      <label className="text-white-smoke">Floor</label>
                      <input value={floor} 
                            onChange={e => setFloor(e.target.value)}
                            className="bg-white-smoke block p-2 drop-shadow-lg"/>
                    </div>
                  </div>

                  <div className="flex items-end gap-10 justify-center">
                    <div>
                      <label className="text-white-smoke">City</label>
                      <select
                        value={city}
                        onChange={(e) => setCity(parseInt(e.target.value))}
                        className="bg-white-smoke block p-2 drop-shadow-lg"
                      >
                        {cities &&
                          cities.map((city) => (
                            <option key={city.id} value={city.id}>
                              {city.name},{city.zip}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-white-smoke">Door</label>
                      <input value={door} 
                            onChange={e => setDoor(e.target.value)}
                            className="bg-white-smoke block p-2 drop-shadow-lg"/>
                    </div>
                    <div>
                      <button className="bg-primary text-white w-full py-2 px-10">Edit</button>
                    </div>
                  </div>
                </form>
                
              
            </div>}
          
          </>
          }
          {!user && <p>No user data.</p>}
        
        
      </div>
    </div>
  )
}

export default ProfilePage