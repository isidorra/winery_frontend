import { Navigate } from "react-router-dom";
import useStateContext, { stateContext } from "../hooks/useStateContext"
import LoginPage from "./LoginPage";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const {context} = useStateContext(stateContext);
  useEffect(() => {
    if(context.username == "")
      return <Navigate to={"/login"}/>
  }, [context])
  return (
    <div className="">
        <h2 className="text-8xl">Profile Page</h2>
        <p>fiwofjwiofjwiofjwoijfwoijwe</p>
        <p>fiwofjwiofjwiofjwoijfwoijwe</p>
        <p>fiwofjwiofjwiofjwoijfwoijwe</p>
        <p>fiwofjwiofjwiofjwoijfwoijwe</p>
        <p>fiwofjwiofjwiofjwoijfwoijwe</p>
        <p>fiwofjwiofjwiofjwoijfwoijwe</p>
        <p>fiwofjwiofjwiofjwoijfwoijwe</p>
        <p>fiwofjwiofjwiofjwoijfwoijwe</p>
    </div>
  )
}

export default ProfilePage