import { Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/Auth/LoginPage"
import RegisterPage from "./pages/Auth/RegisterPage"
import Authenticate from "./pages/Auth/Authenticate"
import ProfilePage from "./pages/Auth/ProfilePage"
import AdministratorPage from "./pages/Administrator/AdministratorPage"
import ProductsPage from "./pages/Customer/ProductsPage"
import ProductDetailsPage from "./pages/Customer/ProductDetailsPage"
import SalesProducts from "./pages/SalesManager.jsx/SalesProducts"
import SalesAnalytics from "./pages/SalesManager.jsx/SalesAnalytics"
import CartPage from "./pages/Customer/CartPage"
import Checkout from "./pages/Customer/Checkout"
import CustomerOrders from "./pages/Customer/CustomerOrders"
import SalesOrders from "./pages/SalesManager.jsx/SalesOrders"



function App() {
  

  return (
    <div className="font-jost">
      
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>

            {/* Administator */}
            <Route path="/administrator" element={<AdministratorPage/>}/>

            {/* Customer */}
            <Route path="/products" element={<ProductsPage/>}/>
            <Route path="/products/:id" element={<ProductDetailsPage/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/customer-orders" element={<CustomerOrders/>}/>
            

            {/* SalesManager */}
            <Route path="/sales-products" element={<SalesProducts/>}/>
            <Route path="/sales-orders" element={<SalesOrders/>}/>
            <Route path="/sales-analytics" element={<SalesAnalytics/>}/>

            
          </Route> 
        </Routes>
   

    </div>
  )
}

export default App
