import { Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import RequireAuth from "./components/RequireAuth"
import AdministratorPage from "./pages/AdministratorPage"
import UnauthorizedPage from "./pages/UnauthorizedPage"
import Page404 from "./pages/Page404"
import ProfilePage from "./pages/ProfilePage"


function App() {
  

  return (
    <div className="font-jost">
      
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/unauthorized" element={<UnauthorizedPage/>}/>
            
            <Route element={<RequireAuth allowedRoles={"ADMINISTRATOR, CUSTOMER"}/>}>
              <Route path="/profile" element={<ProfilePage/>}/>
            </Route>
            <Route element={<RequireAuth allowedRoles={"ADMINISTRATOR"}/>}>
              <Route path="/administrator" element={<AdministratorPage/>}/>
            </Route>

            <Route path="*" element={<Page404/>}/>
          </Route> 
        </Routes>
   

    </div>
  )
}

export default App
