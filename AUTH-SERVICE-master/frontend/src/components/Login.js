import React, { useState } from "react";
import { login, validateLoginOTP, logout } from "../api"; // Import API functions
import "./Login.css"; // Import CSS for styling

const Login = () => {
    const [userName, setUserName] = useState(""); // Username state
    const [password, setPassword] = useState(""); // Password state
    const [otp, setOtp] = useState(""); // OTP state
    const [message, setMessage] = useState(""); // Message for user feedback
    const [loading, setLoading] = useState(false); // Loading state
    const [isOtpRequested, setIsOtpRequested] = useState(false); // OTP request state
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state

    // Handle login (Step 1: Generate OTP)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const response = await login({ userName, password });
            console.log("Réponse du serveur (login) :", response); // Affiche la réponse du serveur
            setMessage(response.message || "OTP envoyé. Veuillez le vérifier.");
            setIsOtpRequested(true);
        } catch (error) {
            console.log("Erreur lors de la connexion :", error); // Affiche l'erreur du serveur
            setMessage(`Erreur lors de la connexion: ${error.message || "Inconnue"}`);
        } finally {
            setLoading(false);
        }
    };

    // Handle OTP validation (Step 2)
    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        // Log OTP value to console
        console.log("OTP saisi:", otp); // Affiche l'OTP saisi dans la console

        try {
            const response = await validateLoginOTP({ userName, otp });
            console.log("Réponse du serveur (OTP) :", response); // Affiche la réponse du serveur
            setMessage(response.message || "Connexion réussie !");
            setIsLoggedIn(true);
        } catch (error) {
            console.log("Erreur lors de la validation OTP :", error); // Affiche l'erreur du serveur
            setMessage(`Erreur lors de la validation OTP: ${error.message || "Inconnue"}`);
        } finally {
            setLoading(false);
        }
    };

    // Handle logout
    const handleLogout = async () => {
        setLoading(true);
        try {
            const response = await logout(userName);
            console.log("Réponse du serveur (logout) :", response); // Affiche la réponse du serveur
            setMessage(response.message || "Déconnexion réussie.");
            setIsLoggedIn(false);
            setIsOtpRequested(false);
            setUserName("");
            setPassword("");
            setOtp("");
        } catch (error) {
            console.log("Erreur lors de la déconnexion :", error); // Affiche l'erreur du serveur
            setMessage(`Erreur lors de la déconnexion: ${error.message || "Inconnue"}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="form-wrapper">
                <div className="form sign-in">
                    {!isOtpRequested && !isLoggedIn ? (
                        // Login form
                        <>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Nom d'utilisateur"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="password"
                                    placeholder="Mot de passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" onClick={handleSubmit} disabled={loading}>
                                {loading ? "Chargement..." : "Se connecter"}
                            </button>
                        </>
                    ) : isLoggedIn ? (
                        // Logged in state
                        <>
                            {/* Icon and logout button at the top left */}
                            <i className="fas fa-sign-out-alt logout-icon" title="Déconnexion" onClick={handleLogout}></i>
                            <div className="profile-section">
                                <p>Bienvenue, {userName}!</p>
                            </div>
                        </>
                    ) : (
                        // OTP validation form
                        <>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Entrez le code OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" onClick={handleOtpSubmit} disabled={loading}>
                                {loading ? "Vérification..." : "Valider OTP"}
                            </button>
                        </>
                    )}
                </div>
            </div>
            {message && <p>{message}</p>} {/* Display feedback messages */}
        </div>
    );
};

export default Login;
