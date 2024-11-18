import React, { useState } from 'react';

function Cadastro({ navigateToLogin }) {
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    const handleCadastro = () => {
        const contas = JSON.parse(localStorage.getItem('contas')) || [];
        const contaExistente = contas.find(conta => conta.usuario === usuario);

        if (contaExistente) {
            setErro('Usuário já existe!'); // Mostra erro se o usuário já existe
        } else {
            const novaConta = { usuario, email, senha };
            contas.push(novaConta);
            localStorage.setItem('contas', JSON.stringify(contas)); // Salva a conta
            navigateToLogin(); // Volta para a tela de login
        }
    };

    return (
        <div>
            <h2>Cadastrar</h2>
            <input
                type="text"
                placeholder="Usuário"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />
            <button onClick={handleCadastro}>Cadastrar</button>
            {erro && <p style={{ color: 'red' }}>{erro}</p>}
            <button onClick={navigateToLogin}>Voltar para Login</button>
        </div>
    );
}

export default Cadastro;
