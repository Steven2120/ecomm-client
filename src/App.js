import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import {
  lightTheme,
  darkTheme,
  GlobalStyles,
} from "./components/Themes/themes";
import "./App.css";

import Navbar from "./components/Navigation/Navbar";
import Backdrop from "./components/Backdrop/Backdrop";
import SideBar from "./components/SideBar/SideBar";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import CartInfoScreen from "./screens/CartInfoScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import LogInScreen from "./screens/LogInScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotpasswordScreen from "./screens/ForgotpasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import ProceedToCheckoutScreen from "./screens/ProceedToCheckoutScreen";

const StyledApp = styled.div``;

function App() {
  const [sideToggle, setSideToggle] = useState(false);

  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <StyledApp>
        <Router>
          <Navbar
            click={() => setSideToggle(true)}
            changeTheme={themeToggler}
            theme={theme}
          />
          <SideBar show={sideToggle} click={() => setSideToggle(false)} />
          <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
          <Routes>
            <Route
              path="/login"
              element={<LogInScreen />}
              render={() => <Navigate to="/" />}
            />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/forgotpassword" element={<ForgotpasswordScreen />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <HomeScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/resetpassword/:resetToken"
              element={<ResetPasswordScreen />}
            />
            <Route
              path="/product/:id"
              element={
                <PrivateRoute>
                  <ProductDetailScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <CartInfoScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <ProceedToCheckoutScreen />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
