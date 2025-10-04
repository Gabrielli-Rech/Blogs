// src/pages/RegisterPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function RegisterPage() {
    // Criamos um estado para cada campo do formulário
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook para nos permitir redirecionar o usuário

    // Função que será chamada quando o formulário for enviado
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o recarregamento da página

        try {
            // Montamos o objeto com os dados do novo usuário
            const userData = {
                username: username,
                email: email,
                password: password
            };

            // Enviamos a requisição POST para o backend
            await api.post('/auth/register', userData);

            alert('Usuário cadastrado com sucesso!');
            navigate('/login'); // Redireciona o usuário para a página de login

        } catch (error) {
            // Lógica de tratamento de erros melhorada
            if (error.response) {
                // O backend respondeu com um erro (ex: email já existe)
                console.error('Erro do backend:', error.response.data);
                alert('Erro no cadastro: ' + error.response.data.message);
            } else if (error.request) {
                // A requisição foi feita, mas não houve resposta (backend fora do ar)
                console.error('Erro de rede:', error.request);
                alert('Não foi possível conectar ao servidor. Verifique se o backend está rodando!');
            } else {
                // Algum outro erro aconteceu ao configurar a requisição
                console.error('Erro:', error.message);
                alert('Ocorreu um erro inesperado.');
            }
        }
    };

    return (
        <div>
            <h1>Cadastrar Novo Usuário</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome de Usuário:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default RegisterPage;