import {BrowserRouter, Routes, Route} from "react-router"
import { lazy, Suspense } from "react"
import { useSelector } from "react-redux"
import Loading from "./components/skeleton/Loading"

const Footer = lazy(()=>import("./pages/Footer"))
const Home = lazy(()=>import("./pages/Home"))
const Navbar = lazy(()=>import("./pages/Navbar"))
const ProductDetail = lazy(()=>import("./pages/ProductDetail"))
const CarItems = lazy(()=>import("./pages/CarItems"))
const MakeOrder = lazy(()=>import("./pages/MakeOrder"))
const UserAccount = lazy(()=>import("./pages/UserAccount"))
const Signup = lazy(()=>import("./pages/Signup"))
const Signin = lazy(()=>import("./pages/Signin"))
const AdminDashboard = lazy(()=>import("./admin/AdminDashboard"))
const PlacedOrder = lazy(()=>import("./pages/PlacedOrder"))
const ForgotPassword = lazy(()=>import("./pages/ForgotPassword"))

function App() {
  const {isAuthenticated} = useSelector(state => state.user.user)
  return (
    <BrowserRouter>
     <Suspense fallback={<Loading/>}>
    <Navbar/>
      <Routes>  
        <Route path="/" element={<Home/>}/>
        <Route path="/product/:id" element={<ProductDetail/>}/>
        <Route path="/cart-items" element={<CarItems/>}/>
        <Route path="/order" element={<MakeOrder/>}/>
        <Route path="/account" element={isAuthenticated? <UserAccount/>: <Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={isAuthenticated?<Home/>:<Signin/>}/>
        <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
        <Route path="/placed-order/:id" element={<PlacedOrder/>}/>
        <Route path="/forget-password" element={<ForgotPassword/>}/>
        
      </Routes>
      <Footer/>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
