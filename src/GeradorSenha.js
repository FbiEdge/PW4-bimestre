import React, { useState } from 'react';

function GeradorSenha() {
    const [comprimento, setComprimento] = useState(12);
    const [incluirMinusculas, setIncluirMinusculas] = useState(false);
    const [incluirMaiusculas, setIncluirMaiusculas] = useState(false);
    const [incluirNumeros, setIncluirNumeros] = useState(false);
    const [incluirEspeciais, setIncluirEspeciais] = useState(false);
    const [senhaGerada, setSenhaGerada] = useState('');
    const [nomeSenha, setNomeSenha] = useState('');
    const [senhasSalvas, setSenhasSalvas] = useState(JSON.parse(localStorage.getItem('senhas')) || []);
    const [mostrarSenhas, setMostrarSenhas] = useState(false);

    const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
    const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numeros = '0123456789';
    const caracteresEspeciais = '!@#$%^&*()_+[]{}<>?,.';

    const gerarSenha = () => {
        let caracteres = '';
        if (incluirMinusculas) caracteres += letrasMinusculas;
        if (incluirMaiusculas) caracteres += letrasMaiusculas;
        if (incluirNumeros) caracteres += numeros;
        if (incluirEspeciais) caracteres += caracteresEspeciais;

        if (caracteres === '') {
            alert('Selecione pelo menos um tipo de caractere.');
            return;
        }

        let senha = '';
        for (let i = 0; i < comprimento; i++) {
            const randomIndex = Math.floor(Math.random() * caracteres.length);
            senha += caracteres.charAt(randomIndex);
        }
        setSenhaGerada(senha);
    };

    const salvarSenha = () => {
        if (!nomeSenha) {
            alert('Por favor, insira um nome para a senha.');
            return;
        }
        const novaSenha = { nome: nomeSenha, senha: senhaGerada };
        const novasSenhas = [...senhasSalvas, novaSenha];
        setSenhasSalvas(novasSenhas);
        localStorage.setItem('senhas', JSON.stringify(novasSenhas));
        setNomeSenha('');
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Gerador de Senha</h2>
            <input
                type="text"
                value={senhaGerada}
                readOnly
                style={styles.inputSenha}
            />
            <div style={styles.sliderContainer}>
                <input
                    type="range"
                    min="6"
                    max="20"
                    value={comprimento}
                    onChange={(e) => setComprimento(e.target.value)}
                    style={styles.slider}
                />
                <span style={styles.sliderValue}>{comprimento}</span>
            </div>

            <div style={styles.checkboxGroup}>
                <label style={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={incluirMinusculas}
                        onChange={(e) => setIncluirMinusculas(e.target.checked)}
                    />
                    Letras Minúsculas
                </label>
                <label style={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={incluirMaiusculas}
                        onChange={(e) => setIncluirMaiusculas(e.target.checked)}
                    />
                    Letras Maiúsculas
                </label>
                <label style={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={incluirNumeros}
                        onChange={(e) => setIncluirNumeros(e.target.checked)}
                    />
                    Números
                </label>
                <label style={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={incluirEspeciais}
                        onChange={(e) => setIncluirEspeciais(e.target.checked)}
                    />
                    Caracteres Especiais
                </label>
            </div>

            <button
                onClick={gerarSenha}
                style={styles.buttonPrimary}
            >
                Gerar
            </button>

            <input
                type="text"
                placeholder="Nome da Senha"
                value={nomeSenha}
                onChange={(e) => setNomeSenha(e.target.value)}
                style={styles.inputNomeSenha}
            />

            <button
                onClick={salvarSenha}
                style={styles.buttonSave}
            >
                Salvar Senha
            </button>

            <button
                onClick={() => setMostrarSenhas(!mostrarSenhas)}
                style={styles.buttonShow}
            >
                {mostrarSenhas ? 'Ocultar Senhas' : 'Ver Senhas'}
            </button>

            {mostrarSenhas && (
                <div style={styles.savedPasswords}>
                    <h3>Senhas Salvas</h3>
                    <ul style={styles.passwordList}>
                        {senhasSalvas.map((item, index) => (
                            <li key={index} style={styles.passwordItem}>
                                <strong>{item.nome}:</strong> {item.senha}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default GeradorSenha;

const styles = {
    container: {
        padding: '20px',
        borderRadius: '10px',
        background: '#f0f0f3',
        boxShadow: '7px 7px 15px #bebebe, -7px -7px 15px #ffffff',
        maxWidth: '350px',
        margin: 'auto',
        textAlign: 'center',
    },
    title: {
        fontSize: '24px',
        color: '#333',
        marginBottom: '20px',
        fontWeight: 'bold',
    },
    inputSenha: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        marginBottom: '15px',
        border: 'none',
        background: '#e0e0e0',
        borderRadius: '10px',
        boxShadow: 'inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff',
    },
    sliderContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '15px',
    },
    slider: {
        width: '80%',
    },
    sliderValue: {
        fontSize: '18px',
        color: '#333',
    },
    checkboxGroup: {
        display: 'grid',
        gap: '10px',
        marginBottom: '20px',
        justifyContent: 'start',
    },
    checkboxLabel: {
        fontSize: '16px',
        color: '#555',
    },
    buttonPrimary: {
        backgroundColor: '#00bfff',
        color: '#fff',
        padding: '10px 20px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        boxShadow: '3px 3px 6px #bebebe, -3px -3px 6px #ffffff',
        marginBottom: '15px',
    },
    inputNomeSenha: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        marginBottom: '15px',
        border: 'none',
        background: '#e0e0e0',
        borderRadius: '10px',
        boxShadow: 'inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff',
    },
    buttonSave: {
        backgroundColor: '#28a745',
        color: '#fff',
        padding: '10px 20px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        boxShadow: '3px 3px 6px #bebebe, -3px -3px 6px #ffffff',
        marginBottom: '15px',
    },
    buttonShow: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 20px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        boxShadow: '3px 3px 6px #bebebe, -3px -3px 6px #ffffff',
        marginBottom: '20px',
    },
    savedPasswords: {
        marginTop: '20px',
    },
    passwordList: {
        listStyleType: 'none',
        padding: 0,
    },
    passwordItem: {
        fontSize: '16px',
        color: '#555',
        padding: '5px 0',
        borderBottom: '1px solid #ddd',
    },
};
