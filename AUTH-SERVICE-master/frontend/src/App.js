import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Header from "./Header";
import { UserProvider } from "./components/UserContext";
import "./App.css";

function App() {
    return (
        <UserProvider>
            <Router>
                <div className="container">
                    <Header /> {/* Header.js */}
                    <div className="row">
                        <Routes>
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </UserProvider>
    );
}

export default App;
