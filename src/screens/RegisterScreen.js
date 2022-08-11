import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterScreen.css";

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/");
    }
  }, [navigate]);

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post(
        "/api/auth/register",
        { firstName, lastName, username, email, password },
        config
      );

      localStorage.setItem("authToken", data.token);

      navigate("/login");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="register-container">
      <form className="register__form" onSubmit={registerHandler}>
        <h3 className="register__title">Register</h3>
        {error && <span className="error__message">{error}</span>}

        <div className="form__group">
          <label htmlFor="firstname" className="register__label">
            First name:
          </label>
          <input
            type="text"
            required
            id="firstname"
            placeholder="Please enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="form__group">
          <label htmlFor="lastname" className="register__label">
            Last name:
          </label>
          <input
            type="text"
            required
            id="lastname"
            placeholder="Please enter a last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="form__group">
          <label className="register__label" htmlFor="name">
            Username:
          </label>
          <input
            type="text"
            required
            id="name"
            placeholder="Please enter a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form__group">
          <label className="register__label" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            required
            id="email"
            placeholder="Please enter an email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form__group">
          <label className="register__label" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            required
            id="password"
            placeholder="Please enter a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form__group">
          <label className="register__label" htmlFor="confirmpassword">
            Confirm Password:
          </label>
          <input
            type="password"
            required
            id="confirmpassword"
            placeholder="Please reenter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="register__btn__div">
          <button type="submit" className="register__btn btn-primary">
            Register
          </button>
        </div>

        <div className="already__div">
          <p className="already">
            Already have an account?{" "}
            <Link className="to__login" to="/login">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;
