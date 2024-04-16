import { Outlet } from "react-router-dom"
import DefaultNavbar from "./components/DefaultNavbar"

const Layout = () => {
  return (
    <div>
        <DefaultNavbar/>
        <Outlet/>
    </div>
  )
}

export default Layout