import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css'; // Assicurati che il percorso sia corretto

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false); // Stato per scegliere login o registrazione
    const [errorMessage, setErrorMessage] = useState(''); // Stato per gestire gli errori

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isRegister ? 'http://localhost:3000/register' : 'http://localhost:3000/login';
            const response = await axios.post(endpoint, { username, password });
            
            if (!isRegister) { // Se è il login, gestisci il token
                onLogin(response.data.token); // Passa il token al componente padre
            }

            setUsername(''); // Resetta il campo nome utente
            setPassword(''); // Resetta il campo password
            setErrorMessage(''); // Resetta il messaggio di errore

        } catch (error) {
            // Gestione dell'errore con controllo aggiuntivo
            const msg = error.response?.data?.message || 'Si è verificato un errore. Riprova più tardi.';
            setErrorMessage(msg); // Imposta il messaggio di errore nello stato
            console.error('Errore:', msg); // Mostra l'errore nella console
        }
    };

    return (
        <div className="auth-form">
            <h2>{isRegister ? 'Registrati' : 'Login'}</h2> {/* Cambia il titolo in base allo stato */}
            <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Nome utente"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {isRegister ? 'Registrati' : 'Login'} {/* Cambia il testo del pulsante */}
                </button>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Mostra il messaggio di errore */}

                <p>
                    {isRegister ? 'Hai già un account?' : 'Non hai un account?'}
                    <button 
                        type="button"
                        className="btn btn-link"
                        onClick={() => setIsRegister(!isRegister)} // Cambia tra login e registrazione
                    >
                        {isRegister ? 'Login' : 'Registrati'}
                    </button>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;
