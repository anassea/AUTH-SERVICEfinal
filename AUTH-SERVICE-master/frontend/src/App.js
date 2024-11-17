import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import "./App.css";

function App() {
  return (
      <Router>
        <div className="container">
          <div className="row">
            <div className="col">
              <header className="app-header">
                <h1>M3allam</h1>
                <nav>
                  <ul>
                    <li><Link to="/signup">Inscription</Link></li>
                    <li><Link to="/login">Connexion</Link></li>
                    <li><Link to="/forgot-password">Mot de passe oublié</Link></li>
                  </ul>
                </nav>
              </header>
            </div>
          </div>
          <div className="row">
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;
