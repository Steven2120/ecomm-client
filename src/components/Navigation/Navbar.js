import jwt_decode from "jwt-decode";
import { CgSun } from "react-icons/cg";
import { HiMoon } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ click, ...props }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => qty + Number(item.qty), 0);
  };

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/" className="home__header">
          <h2>Ecom Shopping Cart</h2>
        </Link>
      </div>
      <ul className="navbar__links">
        <li>
          <Link className="cart__link" to="/cart">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart
              {localStorage.getItem("authToken") ? (
                <span className="cartlogo__badge">{getCartCount()}</span>
              ) : (
                <span className="cartlogo__badge">0</span>
              )}
            </span>
          </Link>
        </li>
        <li>
          <Link className="return__link" to="/">
            <span>Return to Shop</span>
          </Link>
        </li>
        {localStorage.getItem("authToken") ? (
          <li>
            <p className="welcome">
              Welcome {jwt_decode(localStorage.getItem("authToken")).username}
            </p>
            <Link className="logged__in" to="/login">
              <span onClick={logoutHandler}>Logout</span>
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link className="logged__out" to="/login">
                <span>Login</span>
              </Link>
            </li>
            <li>
              <Link className="register" to="/register">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
      {props.theme === "light" ? (
        <button className="sun__btn" onClick={() => props.changeTheme("dark")}>
          <CgSun size={40} />
        </button>
      ) : (
        <button
          className="moon__btn"
          onClick={() => props.changeTheme("light")}
        >
          <HiMoon size={40} />
        </button>
      )}
      <div className="hamburger__menu" onClick={click}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
