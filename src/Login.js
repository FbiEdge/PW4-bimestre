import React, { useState } from 'react';

function Login({ onLogin, navigateToCadastro }) {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    const handleLogin = () => {
        const contas = JSON.parse(localStorage.getItem('contas')) || [];
        const contaValida = contas.find(conta => conta.usuario === usuario && conta.senha === senha);

        if (contaValida) {
            onLogin(); // Loga o usuário
        } else {
            setErro('Login inválido!'); // Exibe mensagem de erro
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Usuário"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
            />
            <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            {erro && <p style={{ color: 'red' }}>{erro}</p>}
            <button onClick={navigateToCadastro}>Cadastrar Conta</button>
        </div>
    );
}

export default Login;
