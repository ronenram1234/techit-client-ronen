import React, { useEffect, useState } from "react";

import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useSearchParams,
  Navigate,

} from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import Cart from "./components/Cart";



function App() {
  const [isNotLogin, setNotIsLogin] = useState(true);
  const userString: string | null = localStorage.getItem("userId");

// check if user login exisist
  useEffect(()=>{if (userString !== null) setNotIsLogin(false)},[] )

  

  return (
    <div>
      <ToastContainer />
      <Router>
        <>
        
          {!isNotLogin ? (<Navbar setNotIsLogin={setNotIsLogin} />) : (<></>)}
          
          <Routes>
            
            {isNotLogin ? (<Route path="/" element={<Login setNotIsLogin={setNotIsLogin}/>} />): ( <Route path="/" element={<Navigate to="/products" />} />)}
            <Route path="/products" element={<Products />} />
            <Route path="/register" element={<Register setNotIsLogin={setNotIsLogin} />} />
            <Route path="/profile" element={<Profile setNotIsLogin={setNotIsLogin}/>} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </>
      </Router>
    </div>
  );
}

export default App;
