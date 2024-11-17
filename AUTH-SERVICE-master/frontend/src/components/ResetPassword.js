import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [otpSent, setOtpSent] = useState(false); // Indicateur si l'OTP a été envoyé

    // Fonction pour envoyer la demande d'OTP
    const handleSubmitPhoneNumber = async (e) => {
        e.preventDefault();
        try {
            // Envoi du numéro de téléphone pour obtenir l'OTP
            const response = await axios.post('http://localhost:8080/router/forgotPassword', { phoneNumber });
            setMessage('Vérifiez votre téléphone pour réinitialiser votre mot de passe.');
            setOtpSent(true); // L'OTP a été envoyé, donc on affiche le champ OTP
        } catch (error) {
            setMessage('Erreur lors de la demande de réinitialisation.');
        }
    };

    // Fonction pour envoyer la demande de réinitialisation du mot de passe avec OTP
    const handleSubmitResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('Les mots de passe ne correspondent pas.');
            return;
        }
        try {
            // Envoi de la requête pour réinitialiser le mot de passe
            const response = await axios.post('http://localhost:8080/router/resetPassword', {
                phoneNumber,
                otp,
                newPassword,
                confirmPassword
            });
            setMessage('Mot de passe réinitialisé avec succès !');
        } catch (error) {
            setMessage('Erreur lors de la réinitialisation du mot de passe.');
        }
    };

    return (
        <div>
            <h2>Réinitialiser le mot de passe</h2>

            {/* Formulaire pour entrer le numéro de téléphone */}
            {!otpSent ? (
                <form onSubmit={handleSubmitPhoneNumber}>
                    <input
                        type="text"
                        placeholder="Numéro de téléphone"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                    <button type="submit">Envoyer OTP</button>
                </form>
            ) : (
                // Formulaire pour entrer l'OTP et le nouveau mot de passe
                <form onSubmit={handleSubmitResetPassword}>
                    <input
                        type="text"
                        placeholder="OTP reçu"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Nouveau mot de passe"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirmer le mot de passe"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Réinitialiser le mot de passe</button>
                </form>
            )}

            <p>{message}</p>
        </div>
    );
};

export default ResetPassword;
