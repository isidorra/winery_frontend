import { Link } from "react-router-dom";
import logo from "../assets/icons/logo.png";
import menu from "../assets/icons/menu.png";
import exit from "../assets/icons/exit.png";
import { useState } from "react";

const DefaultNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleMenu = () => setIsOpen(!isOpen);
    return (
        <div className="nav-gradient fixed w-full mx-auto z-50">
            <div className="max-container flex items-center justify-between  px-5">


                <div className="flex items-center gap-7">
                    <Link to={"/"}>
                        <img src={logo} alt="Logo" className="w-14 md:w-20"/>
                    </Link>

                    <div className="hidden md:flex capitalize text-white-smoke text-lg font-thin tracking-widest items-center gap-5">
                        <Link to={""} className="hover:font-light duration-200">About us</Link>
                        <Link to={""} className="hover:font-light duration-200">Our Wines</Link>
                        <Link to={""} className="hover:font-light duration-200">Tours</Link>
                        <Link to={""} className="hover:font-light duration-200">Wineyards</Link>
                        <Link to={""} className="hover:font-light duration-200">Contact</Link>
                    </div>
                </div>

                <Link to={"/register"} className="bg-secondary text-primary px-4 py-2 rounded-sm hover:bg-primary hover:text-white-smoke duration-200 hidden md:block">
                    Sign Up
                </Link>

                {isOpen ? <img onClick={handleMenu} src={exit} alt="Close" className="block md:hidden w-8 opacity-70"/> : <img onClick={handleMenu} src={menu} alt="Menu" className="block md:hidden w-8 opacity-70"/>}
                
            </div>
            {isOpen &&
                        <div className="bg-darker-accent w-full mx-auto uppercase md:hidden p-10 text-center drop-shadow-xl opacity-90">
                            <Link to={""} className="hover:font-light text-secondary block duration-200 mb-2">About us</Link>
                            <Link to={""} className="hover:font-light text-secondary block duration-200 mb-2">Our Wines</Link>
                            <Link to={""} className="hover:font-light text-secondary block duration-200 mb-2">Tours</Link>
                            <Link to={""} className="hover:font-light text-secondary block duration-200 mb-2">Wineyards</Link>
                            <Link to={""} className="hover:font-light text-secondary block duration-200 mb-5">Contact</Link>
                            <Link to={"/register"} className="bg-secondary text-primary px-4 py-2 rounded-sm hover:bg-primary hover:text-white-smoke duration-200">Sign Up</Link>
                        </div>}
        </div>
        
    )
}

export default DefaultNavbar