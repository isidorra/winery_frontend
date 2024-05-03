import { Link, Navigate, redirect } from "react-router-dom";
import logo from "../assets/icons/logo.png";
import menu from "../assets/icons/menu.png";
import exit from "../assets/icons/exit.png";
import userIcon from "../assets/icons/user.png";
import { useState } from "react";
import useStateContext, { stateContext } from "../hooks/useStateContext";
import LoginPage from "../pages/LoginPage";

const DefaultNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileTabOpen, setProfileTab] = useState(false);
    const {resetContext, context, setContext} = useStateContext(stateContext);
    const [redirect, setRedirect] = useState(false);


    const handleMenu = () => setIsOpen(!isOpen);
    const handleUserTab = () => setProfileTab(!isProfileTabOpen);

    const handleLogout = () => {
        resetContext(); 
        setRedirect(true);

      }
    
    if(redirect)
      return <Navigate to={"/"}/>

    return (
        <div className="nav-gradient fixed w-full mx-auto z-50">
            <div className="max-container flex items-center justify-between  px-5 py-1">


                <div className="flex items-center gap-7">
                    <Link to={"/"}>
                        <img src={logo} alt="Logo" className="w-14 md:w-20"/>
                    </Link>

                    <div className="hidden md:flex capitalize text-secondary text-lg font-thin tracking-widest items-center gap-5">
                        {context.role == "0" && <Link to={"/administrator"} className="hover:font-light duration-200">Employees<span className="pl-5 opacity-70">|</span></Link>}
                        <Link to={""} className="hover:font-light duration-200">About us</Link>
                        <Link to={"/products"} className="hover:font-light duration-200">Our Wines</Link>
                        <Link to={""} className="hover:font-light duration-200">Tours</Link>
                        <Link to={""} className="hover:font-light duration-200">Wineyards</Link>
                        <Link to={""} className="hover:font-light duration-200">Contact</Link>
                    </div>
                </div>

               {context.username != "" ?
               <div className="border border-neutral-100 p-2 rounded-md">
                    <div onClick={handleUserTab} className="flex items-center gap-2 hover:cursor-pointer">
                        <img src={userIcon} className="w-6"/>
                        <p className="text-white-smoke opacity-80">{context.username}</p>
                    </div>
                    {isProfileTabOpen && <>
                        <hr className="my-2"/>
                        <Link to={"/profile"} className="block text-white-smoke">Profile</Link>
                        <button onClick={handleLogout} className="text-white-smoke opacity-80">Logout</button>
                    </>}
                    
               </div>
                 
                :
                    <Link to={"/register"} className="bg-secondary text-primary px-4 py-2 rounded-sm hover:bg-primary hover:text-white-smoke duration-200 hidden md:block">
                        Sign Up
                    </Link>
               }
               
                

                    

                {isOpen ? <img onClick={handleMenu} src={exit} alt="Close" className="block md:hidden w-8 opacity-70"/> : <img onClick={handleMenu} src={menu} alt="Menu" className="block md:hidden w-8 opacity-70"/>}
                
            </div>
            {isOpen &&
                        <div className="bg-primary w-full mx-auto uppercase md:hidden p-10 text-center drop-shadow-xl opacity-90">
                            <Link to={""} className="hover:font-light text-secondary block duration-200 mb-2">About us</Link>
                            <Link to={"/products"} className="hover:font-light text-secondary block duration-200 mb-2">Our Wines</Link>
                            <Link to={""} className="hover:font-light text-secondary block duration-200 mb-2">Tours</Link>
                            <Link to={""} className="hover:font-light text-secondary block duration-200 mb-2">Wineyards</Link>
                            <Link to={""} className="hover:font-light text-secondary block duration-200 mb-5">Contact</Link>
                            <Link to={"/register"} className="bg-secondary text-primary px-4 py-2 rounded-sm hover:bg-primary hover:text-white-smoke duration-200">Sign Up</Link>
                        </div>}
        </div>
        
    )
}

export default DefaultNavbar