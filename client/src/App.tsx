import React, { useEffect } from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import SignIn from "./pages/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./actions/user";
import Navbar from "./components/UI/Navbar/Navbar";

function App() {
  const isAuth = useSelector((state: any) => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(auth());
  }, []);

  return (
    <div className="App">
      <Navbar />
      {!isAuth ? (
        <Routes>
          <Route path="/login" element={<SignIn />}></Route>
          <Route path="/registration" element={<Register />}></Route>
          <Route
              path="*"
              element={<Navigate to="/login" replace />}
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route
              path="*"
              element={<Navigate to="/" replace />}
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
