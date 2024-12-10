import React, { useState } from "react";
import { signUp, validateSignUpOTP } from "../api"; // Assurez-vous d'importer les fonctions d'API

const SignUp = () => {
    const [userName, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);

    // Handle signup submission
    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signUp({ userName, phoneNumber, password });
            setMessage(response.message || response);
            setIsOtpSent(true);
        } catch (error) {
            setMessage(error.message);
        }
    };

    // Handle OTP validation
    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await validateSignUpOTP({ userName, phoneNumber, password, otp });
            setMessage(response.message || response);
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2>Inscription</h2>
                <form onSubmit={handleSignUpSubmit} className="signup-form">
                    <input
                        type="text"
                        placeholder="Nom d'utilisateur"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Numéro de téléphone"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">S'inscrire</button>
                </form>

                {message && <p className="message">{message}</p>}

                {isOtpSent && (
                    <form onSubmit={handleOtpSubmit} className="otp-form">
                        <input
                            type="text"
                            placeholder="Code OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button type="submit">Valider OTP</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default SignUp;
