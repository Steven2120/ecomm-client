import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./SideBar.css";

const SideBar = ({ show, click }) => {
  const sideBarClass = ["sidebar"];

  if (show) {
    sideBarClass.push("show");
  }

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
  };

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => qty + Number(item.qty), 0);
  };

  return (
    <div className={sideBarClass.join(" ")}>
      <ul className="sidebar__links" onClick={click}>
        {localStorage.getItem("authToken") ? (
          <>
            <li className="sidebar__auth__logged__in">
              <Link to="">
                <span>
                  Welcome{" "}
                  {jwt_decode(localStorage.getItem("authToken")).username}
                </span>
              </Link>
            </li>
            <li className="sidebar__auth__logged__in">
              <Link className="logged__in" to="/login" onClick={logoutHandler}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="sidebar__auth">
              <Link className="logged__out" to="/login">
                Login
              </Link>
            </li>
            <li className="sidebar__auth">
              <Link className="register" to="/register">
                Register
              </Link>
            </li>
          </>
        )}
        <li>
          <Link to="/cart">
            <span>
              <i className="fas fa-shopping-cart"></i>
              <span>
                Cart
                {localStorage.getItem("authToken") ? (
                  <span className="sidebar__cartbadge">
                    &#40;{getCartCount()}&#41;
                  </span>
                ) : (
                  <span className="sidebar__cartbadge">&#40;0&#41;</span>
                )}
              </span>
            </span>
          </Link>
        </li>
        <li>
          <Link to="/">Continue to shop</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
