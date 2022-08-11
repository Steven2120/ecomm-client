import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LogInScreen.css";

const LogInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );

      localStorage.setItem("authToken", data.token);

      navigate("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login-container">
      <form className="login__form" onSubmit={loginHandler}>
        <h3 className="login__title">Login</h3>
        {error && <span className="error__message">{error}</span>}

        <div className="form__group">
          <label className="login__label" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            required
            id="email"
            placeholder="Please enter an email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            tabIndex={1}
          />
        </div>

        <div className="form__group">
          <label className="login__label" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            required
            id="password"
            placeholder="Please enter a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            tabIndex={2}
          />
          <Link
            to="/forgotpassword"
            className="login__screen__forgot__pass"
            tabIndex={4}
          >
            Forgot Password
          </Link>

          <div className="login__btn__div">
            <button
              type="submit"
              className="login__btn btn-primary"
              tabIndex={3}
            >
              Login
            </button>
          </div>
        </div>

        <span className="not__registered">
          Don't have an account?{" "}
          <Link className="register__link" to="/register">
            Register
          </Link>
        </span>
      </form>
    </div>
  );
};

export default LogInScreen;
