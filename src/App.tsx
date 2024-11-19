import React, { useEffect, useState } from "react";

import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // useSearchParams,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import Cart from "./components/Cart";
import { User } from "./interfaces/User";
// import UpdateProduct from "./components/Old- UpdateProduct";
// import AddProduct from "./components/Old-AddProduct";
import { Product } from "./interfaces/Product";

// let userApp:User={email:"", password:""}

function App() {
  const [isNotLogin, setNotIsLogin] = useState(true);

  const [userApp, setUserApp] = useState<User>({ email: "", password: "" });
  const userString: string | null = localStorage.getItem("userId");
  const [cart, setCart] = useState<Product[]>([]);

  // check if user login exisist
  useEffect(() => {
    if (userString !== null) {
      setNotIsLogin(false);
      const obj: User = JSON.parse(userString);
      setUserApp(obj);
    }
  }, []);

  return (
    <div>
      <>
        <ToastContainer />
        <Router>
          <>
            {!isNotLogin ? (
              <Navbar setNotIsLogin={setNotIsLogin} userApp={userApp} cart={cart}  />
            ) : (
              <></>
            )}

            <Routes>
              {isNotLogin ? (
                <Route
                  path="/"
                  element={
                    <Login
                      setNotIsLogin={setNotIsLogin}
                      setUserApp={setUserApp}
                    />
                  }
                />
              ) : (
                <Route path="/" element={<Navigate to="/products" />} />
              )}
              <Route path="/products" element={<Products userApp={userApp} cart={cart} setCart={setCart}/>}>
                {/* <Route path="updateproduct" element={<UpdateProduct />} />
                <Route path="addproduct" element={<AddProduct />} /> */}
              </Route>
              <Route
                path="/register"
                element={<Register setNotIsLogin={setNotIsLogin} />}
              />
              <Route
                path="/profile"
                element={<Profile setNotIsLogin={setNotIsLogin} />}
              />
              <Route path="/cart" element={<Cart cart={cart} />} />
            </Routes>
          </>
        </Router>
      </>
    </div>
  );
}

export default App;
