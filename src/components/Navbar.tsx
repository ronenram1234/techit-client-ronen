import { FunctionComponent } from "react";
import { NavigateFunction, NavLink, useNavigate } from "react-router-dom";

interface NavbarProps {
  setNotIsLogin:React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar: FunctionComponent<NavbarProps> = ({setNotIsLogin}) => {
  const navigate: NavigateFunction = useNavigate();
  return (
    <>
    

      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/home">
            Techit
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">
                  Cart
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <button
                className="btn btn-outline-info"
                type="submit"
                onClick={() => {
                  navigate("/");
                  localStorage.removeItem("userId");
                  setNotIsLogin(true)
                }}
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
