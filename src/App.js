import React, { useState } from 'react';
import Login from './Login';
import Cadastro from './Cadastro';
import GeradorSenha from './GeradorSenha';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [screen, setScreen] = useState('login');

    const handleLogin = () => {
        setLoggedIn(true);
        setScreen('gerador');
    };

    return (
        <div>
            {loggedIn ? (
                <GeradorSenha />
            ) : (
                screen === 'login' ? (
                    <Login
                        onLogin={handleLogin}
                        navigateToCadastro={() => setScreen('cadastro')}
                    />
                ) : (
                    <Cadastro navigateToLogin={() => setScreen('login')} />
                )
            )}
        </div>
    );
}

export default App;
