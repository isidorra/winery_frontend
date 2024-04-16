import { Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"


function App() {
  

  return (
    <div className="font-jost">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
        </Route> 
      </Routes>
    </div>
  )
}

export default App
