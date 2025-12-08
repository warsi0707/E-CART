import { BrowserRouter, Routes, Route } from "react-router";

import {useSelector} from "react-redux"
import { useEffect } from "react";
import {useDispatch} from "react-redux"
import { verifyUser } from "./redux/features/adminSlice";
import { lazy } from "react";
const Dashboard = lazy(()=> import("./pages/Dashboard"))
const Signin = lazy(()=> import("./pages/Signin"))

function App() {
  const dispatch = useDispatch()
  const isAuthencticated= useSelector(state => state.admin.isAuthencticated)
  useEffect(()=>{
    dispatch(verifyUser())
  },[])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthencticated == true? <Dashboard />:<Signin />} />
        <Route path="/signin" element={isAuthencticated == true? <Dashboard />: <Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
