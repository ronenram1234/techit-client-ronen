import React, { useState } from "react";

import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import Cart from "./components/Cart";

function App() {
  const [isNotLogin, setNotIsLogin] = useState(false);

  return (
    <div>
      <ToastContainer />
      <Router>
        <>
        
          {!isNotLogin ? (<Navbar setNotIsLogin={setNotIsLogin} />) : (<></>)}
          
          <Routes>
            <Route path="/" element={<Login setNotIsLogin={setNotIsLogin}/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </>
      </Router>
    </div>
  );
}

export default App;
