import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "./components/UserContext";

const Header = () => {
    const { user, setUser } = useUser();

    const handleLogout = () => {
        setUser(null); // Réinitialise l'utilisateur
        alert("Déconnexion réussie !");
    };

    return (
        <header className="app-header">
            <h1>M3allam</h1>
            <nav>
                <ul>
                    {!user ? (
                        <>
                            <li><Link to="/signup">Inscription</Link></li>
                            <li><Link to="/login">Connexion</Link></li>
                        </>
                    ) : (
                        <>
                            <li>
                                <span>Bonjour, {user.name}</span>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="logout-button">
                                    <img src="logout-icon.png" alt="Déconnexion" style={{ width: "20px" }} />
                                </button>
                            </li>
                        </>
                    )}
                    <li><Link to="/forgot-password">Mot de passe oublié</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
