import { Navigate } from "react-router-dom";
import useStateContext, { stateContext } from "../hooks/useStateContext"
import LoginPage from "./LoginPage";
import { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const {context} = useStateContext(stateContext);
  const [user, setUser] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [cityId, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [door, setDoor] = useState("");
  const [floor, setFloor] = useState("");

  const [profilePhoto, setProfilePhoto] = useState("");

  

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

  useEffect(() => {
    loadUser();
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
          cityId, 
          zip, 
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
          phoneNumber,
        });
        console.log(response);
      } else {
        const response = await axios.post(`http://localhost:5257/api/employees/edit/employee/username?username=${context.username}`,{
          firstName, 
          lastName, 
          email,
          password, 
          profilePhoto,
        });

        console.log(response);
      }
    } catch (e) {

    }
  }

  return (
    <div className="max-container pt-36">
        <h2 className="text-3xl">Profile Page</h2>
          
          {user && <>
            <div className="flex items-center justify-between">
                <div className="w-1/2">
                  <h3 className="text-xl">Personal Info</h3>
                  <p>{user.firstname} {user.lastname}</p>
                  <p>{user.email}</p>
                  <p>{user.username}</p>
                  <p>{user.birthDate}</p>
                  <p>{user.gender == 0 ? "Male" : "Female"}</p>
                  <p>{user.phoneNumber}</p>

                  
                </div>

                {user.role === 9 && 
                <div className="w-1/2">
                    <h3 className="text-xl">Delivery Info</h3>
                    <p>Street: {user.street}</p>
                    <p>Door: {user.door}</p>
                    <p>City: {user.cityId}</p>
                    <p>Floor: {user.floor}</p>
                    <p>Number: {user.number}</p>
                    <p>ZIP: {user.zip}</p>
                </div>}
          </div>
          <div className="flex items-start justify-between">
            <div className="w-1/2">
              <h3 className="mt-5">Edit Personal Info</h3>
              <form onSubmit={handleEditPersonal}>
                <label>First Name</label>
                <input value={firstName} 
                      onChange={e => setFirstName(e.target.value)}
                      className="bg-white-smoke block p-2 drop-shadow-lg"/>

                <label>Last Name</label>
                <input value={lastName} 
                      onChange={e => setLastName(e.target.value)}
                      className="bg-white-smoke block p-2 drop-shadow-lg"/>

                <label>Email Address</label>
                <input value={email} 
                      onChange={e => setEmail(e.target.value)}
                      className="bg-white-smoke block p-2 drop-shadow-lg"/>

                <label>Password</label>
                <input value={password} 
                      onChange={e => setPassword(e.target.value)}
                      className="bg-white-smoke block p-2 drop-shadow-lg"/>

                <label>Confirm Password</label>
                <input value={passwordConfirmation} 
                      onChange={e => setPasswordConfirmation(e.target.value)}
                      className="bg-white-smoke block p-2 drop-shadow-lg"/>

                <label>Phone Number</label>
                <input value={phoneNumber} 
                      onChange={e => setPhoneNumber(e.target.value)}
                      className="bg-white-smoke block p-2 drop-shadow-lg"/>

                <button className="bg-primary text-white px-6 py-2 my-10">Edit</button>
              </form>
            </div>

            {user.role === 9 && 
              <div className="w-1/2">
                <h3 className="mt-5">Edit Delivery Info</h3>
                <form onSubmit={handleEditDelivery}>
                  <label>Street</label>
                  <input value={street} 
                        onChange={e => setStreet(e.target.value)}
                        className="bg-white-smoke block p-2 drop-shadow-lg"/>

                  <label>Number</label>
                  <input value={number} 
                        onChange={e => setNumber(e.target.value)}
                        className="bg-white-smoke block p-2 drop-shadow-lg"/>

                  <label>City</label>
                  <input value={cityId} 
                        onChange={e => setCity(e.target.value)}
                        className="bg-white-smoke block p-2 drop-shadow-lg"/>

                  <label>Zip</label>
                  <input value={zip} 
                        onChange={e => setZip(e.target.value)}
                        className="bg-white-smoke block p-2 drop-shadow-lg"/>

                  <label>Door</label>
                  <input value={door} 
                        onChange={e => setDoor(e.target.value)}
                        className="bg-white-smoke block p-2 drop-shadow-lg"/>

                  <label>Floor</label>
                  <input value={floor} 
                        onChange={e => setFloor(e.target.value)}
                        className="bg-white-smoke block p-2 drop-shadow-lg"/>

                  <button className="bg-primary text-white px-6 py-2 my-10">Edit</button>
                </form>
                
              
              </div>}
          </div>
          </>
          }
          {!user && <p>No user data.</p>}
        
        
    </div>
  )
}

export default ProfilePage