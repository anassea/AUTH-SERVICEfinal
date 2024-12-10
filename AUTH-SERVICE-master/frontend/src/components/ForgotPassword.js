import React, { useState } from "react";
import { forgotPassword, resetPasswordWithOTP } from "../api.js";

const ForgotPassword = () => {
    const [phoneNumber, setPhoneNumber] = useState(""); // Stocker le numéro de téléphone
    const [otp, setOtp] = useState(""); // Stocker l'OTP
    const [newPassword, setNewPassword] = useState(""); // Stocker le nouveau mot de passe
    const [confirmPassword, setConfirmPassword] = useState(""); // Confirmer le nouveau mot de passe
    const [message, setMessage] = useState(""); // Message général
    const [messageStyle, setMessageStyle] = useState(""); // Style du message (succès ou erreur)
    const [otpSent, setOtpSent] = useState(false); // Indicateur si l'OTP a été envoyé

    // Fonction pour gérer la soumission du numéro de téléphone
    const handleSubmitPhoneNumber = async (e) => {
        e.preventDefault();
        const data = { phoneNumber }; // Préparer les données
        console.log("Données envoyées au serveur :", data); // Log des données envoyées

        setMessage(""); // Réinitialiser le message avant le nouvel envoi

        try {
            const response = await forgotPassword(data); // Appel à l'API
            console.log("Réponse reçue :", response); // Log de la réponse

            // Inspecter toute la réponse pour mieux comprendre sa structure
            if (response) {
                console.log("Réponse complète du serveur:", response);

                // Vérification si le message contient un OTP
                if (typeof response === "string" && response.includes("OTP")) {
                    // Si la réponse est une chaîne contenant "OTP"
                    setMessage(response); // Affiche le message OTP reçu
                    setMessageStyle("green"); // Style de succès
                    setOtpSent(true); // L'OTP a été envoyé, on permet à l'utilisateur de saisir l'OTP
                } else if (response.message && response.message.includes("OTP")) {
                    // Si la réponse contient une clé 'message' et inclut "OTP"
                    setMessage(response.message); // Affiche le message OTP reçu
                    setMessageStyle("green"); // Style de succès
                    setOtpSent(true); // L'OTP a été envoyé
                } else {
                    // Si aucune condition OTP n'est trouvée
                    setMessage("Réponse inattendue du serveur.");
                    setMessageStyle("orange"); // Style neutre
                }
            } else {
                setMessage("Aucune réponse du serveur.");
                setMessageStyle("red"); // Style d'erreur
            }
        } catch (error) {
            console.error("Erreur capturée :", error); // Log des erreurs
            setMessage(error.message || "Erreur lors de la réinitialisation."); // Toujours afficher un message
            setMessageStyle("red"); // Style d'erreur
        }
    };

    // Fonction pour gérer la réinitialisation du mot de passe
    const handleSubmitResetPassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("Les mots de passe ne correspondent pas.");
            setMessageStyle("red");
            return;
        }

        const data = {
            phoneNumber,
            otp,
            newPassword,
            confirmPassword,
        };

        try {
            const response = await resetPasswordWithOTP(data); // Appel à l'API pour réinitialiser le mot de passe
            console.log("Réponse du serveur (réinitialisation) :", response); // Log réponse

            // Message après réinitialisation
            if (response && response.message === "Mot de passe réinitialisé avec succès.") {
                setMessage(response.message); // Afficher un message de succès
                setMessageStyle("green");
            } else {
                setMessage("Erreur lors de la réinitialisation du mot de passe.");
                setMessageStyle("red");
            }
        } catch (error) {
            setMessage("Erreur lors de la réinitialisation.");
            setMessageStyle("red");
        }
    };

    return (
        <div>
            {/* Formulaire pour la soumission du numéro de téléphone */}
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

            {/* Si OTP envoyé, afficher le formulaire de réinitialisation */}
            {otpSent && (
                <form onSubmit={handleSubmitResetPassword}>
                    <input
                        type="text"
                        placeholder="Entrez OTP"
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
                        placeholder="Confirmer mot de passe"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Réinitialiser mot de passe</button>
                </form>
            )}

            {/* Affichage des messages */}
            {message && <p style={{ color: messageStyle }}>{message}</p>}
        </div>
    );
};

export default ForgotPassword;
