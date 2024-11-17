import React, { useState } from "react";
import { login, validateLoginOTP } from "../api";
import "./Login.css";

const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isOtpRequested, setIsOtpRequested] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        const data = { userName, password };

        try {
            const response = await login(data);
            setIsOtpRequested(true);
        } catch (error) {
            setMessage(`Erreur lors de la connexion: ${error.message || "Inconnue"}`);
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const data = { userName, otp };
        try {
            const response = await validateLoginOTP(data);
            setMessage(response.message || "Connexion réussie !");
        } catch (error) {
            setMessage(`Erreur lors de la validation OTP: ${error.message || "Inconnue"}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="form-wrapper">
                <div className="form sign-in">
                    {!isOtpRequested ? (
                        <>
                            <div className="input-group">
                                <i className="bx bxs-user"></i>
                                <input
                                    type="text"
                                    placeholder="Nom d'utilisateur"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <i className="bx bxs-lock-alt"></i>
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
                    ) : (
                        <>
                            <div className="input-group">
                                <i className="bx bxs-lock-alt"></i>
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

            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
