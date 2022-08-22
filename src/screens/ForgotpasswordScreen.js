import { useState } from "react";
import axios from "axios";
import "./ForgotpasswordScreen.css";

const ForgotpasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL_ENDPOINT}
        /api/auth/forgotpassword`,
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="fp__screen">
      <form className="fp__form" onSubmit={forgotPasswordHandler}>
        <h3 className="fp__title">Forgot Password</h3>
        {error && <span className="error__message">{error}</span>}
        {success && <span className="success__message">{success}</span>}
        <div className="form__group">
          <p className="fp__text">
            To reset your password, enter your email below and submit. An email
            will be sent to you with instructions about how to complete the
            process.
          </p>
          <label className="forgot__label" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            required
            id="email"
            placeholder="Please enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="forgot__btn btn btn-primary">Send Email</button>
      </form>
    </div>
  );
};

export default ForgotpasswordScreen;
